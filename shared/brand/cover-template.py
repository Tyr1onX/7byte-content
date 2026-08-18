from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, sys

BG=(15,16,14); SURFACE=(25,26,23); RAISED=(34,35,31); BORDER=(56,59,51)
TEXT=(244,241,232); MUTED=(150,154,144); ACCENT=(216,255,104); ACCENT_DARK=(29,36,17)
PAPER=(247,247,243); BLUE=(78,110,242)
FONT_REG='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
FONT_BOLD='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
FONT_MONO='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'

def font(path,size): return ImageFont.truetype(path,size)

def fit_text(draw,text,max_width,path,start_size,min_size=34):
    size=start_size
    while size>=min_size:
        f=font(path,size)
        box=draw.textbbox((0,0),text,font=f)
        if box[2]-box[0] <= max_width: return f
        size-=2
    return font(path,min_size)

def render(config_path,out_path,width=1080,height=1920):
    cfg=json.loads(Path(config_path).read_text(encoding='utf-8'))
    avatar_path=Path(__file__).parent/'assets'/'douyin-avatar-384.jpg'
    im=Image.new('RGB',(width,height),BG); d=ImageDraw.Draw(im)

    d.rounded_rectangle((70,70,width-70,height-70),radius=36,outline=BORDER,width=2)

    av=Image.open(avatar_path).convert('RGB').resize((112,112),Image.Resampling.LANCZOS)
    mask=Image.new('L',(112,112),0); ImageDraw.Draw(mask).ellipse((0,0,111,111),fill=255)
    d.ellipse((78,102,202,226),outline=ACCENT,width=3); im.paste(av,(84,108),mask)
    d.text((230,112),'7BYTE',fill=TEXT,font=font(FONT_MONO,46))
    d.text((232,174),'把计算机讲简单一点。',fill=MUTED,font=font(FONT_REG,26))

    meta=cfg.get('meta','INTERNET'); mf=font(FONT_MONO,22); mw=d.textbbox((0,0),meta,font=mf)[2]
    d.text((width-78-mw,138),meta,fill=MUTED,font=mf)

    title_y=315
    for i,line in enumerate(cfg['title_lines']):
        f=fit_text(d,line,width-160,FONT_BOLD,86 if i==0 else 92,58)
        d.text((80,title_y),line,fill=TEXT,font=f); title_y+=int(f.size*1.18)
    d.rounded_rectangle((82,title_y+12,270,title_y+20),radius=4,fill=ACCENT)
    if cfg.get('kicker'):
        d.text((82,title_y+58),cfg['kicker'],fill=MUTED,font=font(FONT_REG,31))

    hero_top=760
    d.rounded_rectangle((82,hero_top,width-82,hero_top+410),radius=34,fill=SURFACE,outline=BORDER,width=3)
    d.rounded_rectangle((108,hero_top+32,width-108,hero_top+112),radius=40,fill=(17,18,15),outline=BORDER,width=2)
    d.ellipse((142,hero_top+55,170,hero_top+83),outline=MUTED,width=2)
    d.text((190,hero_top+52),cfg.get('address','baidu.com'),fill=TEXT,font=font(FONT_MONO,32))
    d.rounded_rectangle((108,hero_top+140,width-108,hero_top+378),radius=22,fill=PAPER)
    d.text((width//2-64,hero_top+175),'百度',fill=BLUE,font=font(FONT_BOLD,54))
    d.rounded_rectangle((200,hero_top+258,width-200,hero_top+322),radius=16,outline=(205,207,201),width=2,fill=(255,255,255))
    d.rounded_rectangle((width-310,hero_top+258,width-200,hero_top+322),radius=16,fill=BLUE)
    d.text((225,hero_top+274),'baidu.com',fill=(135,138,132),font=font(FONT_REG,25))

    flow_y=hero_top+505; labels=cfg.get('keywords',['DNS','HTTPS','HTTP','RENDER'])
    descs=cfg.get('keyword_desc',['找地址','加密通道','发请求','画网页']); slot_w=190; gap=24
    start_x=(width-(slot_w*4+gap*3))//2; chip_f=font(FONT_MONO,26); small_f=font(FONT_REG,19)
    for i in range(4):
        x=start_x+i*(slot_w+gap); fill=ACCENT_DARK if i<3 else RAISED; stroke=(65,80,33) if i<3 else BORDER
        d.rounded_rectangle((x,flow_y,x+slot_w,flow_y+106),radius=22,fill=fill,outline=stroke,width=2)
        tw=d.textbbox((0,0),labels[i],font=chip_f)[2]; d.text((x+(slot_w-tw)//2,flow_y+18),labels[i],fill=ACCENT if i<3 else TEXT,font=chip_f)
        dw=d.textbbox((0,0),descs[i],font=small_f)[2]; d.text((x+(slot_w-dw)//2,flow_y+65),descs[i],fill=MUTED,font=small_f)
        if i<3:
            ax=x+slot_w+5; d.line((ax,flow_y+53,ax+14,flow_y+53),fill=ACCENT,width=3)
            d.polygon([(ax+14,flow_y+47),(ax+22,flow_y+53),(ax+14,flow_y+59)],fill=ACCENT)

    hook=cfg.get('bottom_line','一次回车，背后发生了什么？')
    hf=fit_text(d,hook,width-160,FONT_BOLD,44,32); hb=d.textbbox((0,0),hook,font=hf)
    d.text(((width-(hb[2]-hb[0]))//2,height-300),hook,fill=TEXT,font=hf)
    footer=cfg.get('footer','DNS → HTTPS → HTTP → RENDER'); sf=font(FONT_MONO,22); sb=d.textbbox((0,0),footer,font=sf)
    d.text(((width-(sb[2]-sb[0]))//2,height-224),footer,fill=MUTED,font=sf)

    bw,gap=13,8; total=7*bw+6*gap; sx=(width-total)//2
    for i in range(7):
        d.rounded_rectangle((sx+i*(bw+gap),height-150,sx+i*(bw+gap)+bw,height-150+bw),radius=3,fill=ACCENT if i<4 else BORDER)

    im.save(out_path,quality=96)

if __name__=='__main__':
    render(sys.argv[1],sys.argv[2])
