# QQ官bot开启全量和主动消息的 配置页面 URL 编码规则

> ⚠️ **注意：** 本文可能随 QQ 官方接口更新而过时。
> ✅ **2026-06-01 实测仍可用。**
>
> **打开链接必须使用手机 QQ 9.2.90.35975 或以上版本。**

## URL 模板
```
https://club.vip.qq.com/transfer?open_kuikly_info=<encodeURIComponent(JSON)>
```

## JSON 结构
```json
{
  "page_name": "ai_group_service_agreement_pop_page",
  "groupCode": 123456,       // 群号，数字
  "botUin": 10001,           // 官Bot QQ号，数字
  "botUid": "xxx...xxx",     // 官Bot UID，字符串
  "screen": 1                // 固定 1
}
```

## 编码步骤
1. `JSON.stringify(obj)` → 压缩为一行，无空格换行
2. `encodeURIComponent(str)` → URL 编码
3. 拼接到 `?open_kuikly_info=` 后

## 完整示例
**输入参数：**
- groupCode = `259248174`
- botUin = `3889003796`
- botUid = `MjU3Mzg1NTc2Njo2NTAzOTk5OTQ3...pYR1E9PQ`

**第1步：构建 JSON（单行压缩）**
```
{"page_name":"ai_group_service_agreement_pop_page","groupCode":259248174,"botUin":3889003796,"botUid":"MjU3Mzg1NTc2Njo2NTAzOTk5OTQ3...pYR1E9PQ","screen":1}
```

**第2步：URL 编码**
```
%7B%22page_name%22%3A%22ai_group_service_agreement_pop_page%22%2C%22groupCode%22%3A259248174%2C%22botUin%22%3A3889003796%2C%22botUid%22%3A%22MjU3Mzg1NTc2Njo2NTAzOTk5OTQ3...pYR1E9PQ%3D%3D%22%2C%22screen%22%3A1%7D
```

**第3步：拼接完整 URL**
```
https://club.vip.qq.com/transfer?open_kuikly_info=%7B%22page_name%22%3A%22ai_group_service_agreement_pop_page%22%2C%22groupCode%22%3A259248174%2C%22botUin%22%3A3889003796%2C%22botUid%22%3A%22MjU3Mzg1NTc2Njo2NTAzOTk5OTQ3...pYR1E9PQ%3D%3D%22%2C%22screen%22%3A1%7D
```

## 常用字符编码对照
| 字符 | 编码 |
|------|------|
| `{` | `%7B` |
| `}` | `%7D` |
| `"` | `%22` |
| `:` | `%3A` |
| `,` | `%2C` |
| `/` | `%2F` |
| `=` | `%3D` |
| 空格 | `%20` |

## 便捷工具

也可以使用配套 Koishi 插件，通过 NapCat + 官Bot 接口自动获取 URL：

[https://github.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link](https://github.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link)
