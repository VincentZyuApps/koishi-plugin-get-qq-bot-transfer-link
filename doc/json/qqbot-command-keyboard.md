# `qqBotCommandKeyboardJson` 填写示范

这个配置项由 `qqbot-url` 和 `qqbot-guide` 共用。请把某个示例的完整 JSON 填入配置项，不要添加 Markdown 代码块标记。

## 可用占位符

| 占位符 | `qqbot-url` 中的值 | `qqbot-guide` 中的值 |
|---|---|---|
| `${jumpActionType}` | `0`，打开链接 | `2`，输入指令 |
| `${jumpActionData}` | 当前生成的迁移链接 | `/一键跳转免艾特配置 【在这里填入群号】` |
| `${jumpEnter}` | `false` | `false` |
| `${url}` | 当前生成的迁移链接 | 空字符串 |

推荐使用前三个上下文占位符组合动态按钮。占位符作为完整字段值时必须保留双引号，插件渲染后会恢复为正确的数字、布尔值或字符串类型。`${url}` 只在 `qqbot-url` 中有实际内容，不建议单独用于两个指令共用的主要按钮。

## 示例 1：默认两行布局

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "jump",
          "render_data": { "label": "🌐🔗 打开配置链接", "style": 1 },
          "action": {
            "type": "${jumpActionType}",
            "permission": { "type": 2 },
            "data": "${jumpActionData}",
            "enter": "${jumpEnter}",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    },
    {
      "buttons": [
        {
          "id": "guide",
          "render_data": { "label": "📱📖 获取手动配置指南", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/qqbot-guide",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```

## 示例 2：两个按钮并排显示

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "jump",
          "render_data": { "label": "打开配置", "style": 1 },
          "action": {
            "type": "${jumpActionType}",
            "permission": { "type": 2 },
            "data": "${jumpActionData}",
            "enter": "${jumpEnter}",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        },
        {
          "id": "guide",
          "render_data": { "label": "手动配置指南", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/qqbot-guide",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```

## 示例 3：只显示动态配置按钮

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "jump",
          "render_data": { "label": "继续配置", "style": 1 },
          "action": {
            "type": "${jumpActionType}",
            "permission": { "type": 2 },
            "data": "${jumpActionData}",
            "enter": "${jumpEnter}",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```

## 示例 4：动态配置按钮与帮助菜单

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "jump",
          "render_data": { "label": "🌐🔗 打开配置链接", "style": 1 },
          "action": {
            "type": "${jumpActionType}",
            "permission": { "type": 2 },
            "data": "${jumpActionData}",
            "enter": "${jumpEnter}",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        },
        {
          "id": "help-menu",
          "render_data": { "label": "玩玩其他的", "style": 0 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/帮助菜单",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```

## 示例 5：三行完整导航

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "jump",
          "render_data": { "label": "打开或填写配置", "style": 1 },
          "action": {
            "type": "${jumpActionType}",
            "permission": { "type": 2 },
            "data": "${jumpActionData}",
            "enter": "${jumpEnter}",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    },
    {
      "buttons": [
        {
          "id": "guide",
          "render_data": { "label": "手机QQ手动配置指南", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/qqbot-guide",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        },
        {
          "id": "help-menu",
          "render_data": { "label": "帮助菜单", "style": 0 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/帮助菜单",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    },
    {
      "buttons": [
        {
          "id": "forum",
          "render_data": { "label": "打开 Koishi 论坛", "style": 0 },
          "action": {
            "type": 0,
            "permission": { "type": 2 },
            "data": "https://forum.koishi.xyz/t/topic/12558",
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```
