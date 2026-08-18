from PIL import Image, ImageDraw, ImageFont
import numpy as np, subprocess, sys
from pathlib import Path

W,H,FPS,DUR=1080,1920,60,5.4
BG=(15,16,14); TEXT=(244,241,232); MUTED=(151,155,145); ACCENT=(216,255,104); PANEL=(25,26,23)
FONT_REG='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
FONT_MONO='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'

def clamp(v,a=0,b=1): return max(a,min(b,v))
def ease(t): t=clamp(t); return 1-(1-t)**3
def easeio(t):
    t=clamp(t)
    return 4*t*t*t if t<0.5 else 1-((-2*t+2)**3)/2

def main(out_path):
    avatar_path=Path(__file__).parent/'assets'/'douyin-avatar-384.jpg'
    avatar=Image.open(avatar_path).convert('RGB')
    brand=ImageFont.truetype(FONT_MONO,112); tag=ImageFont.truetype(FONT_REG,42); small=ImageFont.truetype(FONT_MONO,24)
    cmd=['ffmpeg','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-',
         '-an','-c:v','libx264','-preset','ultrafast','-tune','animation','-crf','12','-pix_fmt','yuv420p','-movflags','+faststart',out_path]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    for i in range(int(FPS*DUR)):
        t=i/FPS; frame=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(frame)
        q=ease((t-.15)/.7); col=tuple(int(BG[j]+(PANEL[j]-BG[j])*q) for j in range(3))
        d.line((86,150,W-86,150),fill=col,width=2); d.line((86,H-150,W-86,H-150),fill=col,width=2)
        a=ease((t-.25)/.75)
        if a>0:
            size=int(250+70*a); av=avatar.resize((size,size),Image.Resampling.LANCZOS)
            x=(W-size)//2; y=int(535+28*(1-a)); d.ellipse((x-12,y-12,x+size+12,y+size+12),outline=ACCENT,width=3)
            frame.paste(av,(x,y))
        for k in range(7):
            b=ease((t-(.75+k*.055))/.30)
            if b<=0: continue
            bw,gap=22,12; total=7*bw+6*gap; bx=(W-total)//2+k*(bw+gap); by=int(930+12*(1-b))
            c=tuple(int(BG[j]+(ACCENT[j]-BG[j])*b) for j in range(3)); d.rounded_rectangle((bx,by,bx+bw,by+bw),radius=4,fill=c)
        bp=ease((t-1.05)/.58)
        if bp>0:
            s='7BYTE'; box=d.textbbox((0,0),s,font=brand); tw=box[2]-box[0]; c=tuple(int(BG[j]+(TEXT[j]-BG[j])*bp) for j in range(3))
            d.text(((W-tw)//2,int(1020+22*(1-bp))),s,font=brand,fill=c)
        ul=easeio((t-1.42)/.48)
        if ul>0:
            half=int(82*ul); d.rounded_rectangle((W//2-half,1180,W//2+half,1186),radius=3,fill=ACCENT)
        tp=ease((t-1.68)/.60)
        if tp>0:
            s='把计算机讲简单一点。'; box=d.textbbox((0,0),s,font=tag); tw=box[2]-box[0]; c=tuple(int(BG[j]+(MUTED[j]-BG[j])*tp) for j in range(3))
            d.text(((W-tw)//2,int(1235+18*(1-tp))),s,font=tag,fill=c)
        cp=ease((t-2.05)/.40)
        if cp>0:
            s='>_'; box=d.textbbox((0,0),s,font=small); tw=box[2]-box[0]; blink=1.0 if int((t-2.4)*2.2)%2==0 else .35
            c=tuple(int(BG[j]+(MUTED[j]-BG[j])*cp*blink) for j in range(3)); d.text(((W-tw)//2,1355),s,font=small,fill=c)
        p.stdin.write(np.asarray(frame,dtype=np.uint8).tobytes())
    p.stdin.close(); err=p.stderr.read().decode('utf-8',errors='ignore')
    if p.wait()!=0: raise RuntimeError(err[-4000:])

if __name__=='__main__':
    main(sys.argv[1] if len(sys.argv)>1 else '7BYTE-outro-reference.mp4')
