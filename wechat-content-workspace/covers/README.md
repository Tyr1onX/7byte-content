# 封面图

公众号封面统一使用：

```text
1175 x 500 px
2.35:1
```

建议路径：

```text
covers/YYYY-MM/YYYY-MM-DD_文章标题.png
```

封面可以先手动上传到公众号素材库，然后把返回的永久素材 `media_id` 放到环境变量：

```bash
export WECHAT_MP_COVER_MEDIA_ID="封面永久素材 media_id"
```

也可以在创建草稿时通过 `--cover` 参数让脚本上传。
