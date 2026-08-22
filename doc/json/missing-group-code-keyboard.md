# `missingGroupCodeKeyboardJson` 填写示范

这个配置项控制缺少群号时发送的 QQ Markdown 按钮。请把某个示例的完整 JSON 填入配置项，不要添加 Markdown 代码块标记。

- `action.type: 2` 表示点击后输入或执行指令。
- `enter: false` 表示只把内容填入输入框，方便用户修改群号。
- `enter: true` 表示点击后立即发送指令。
- `permission.type: 2` 表示按钮面向当前消息允许的普通用户。
- 配置留空时不发送按钮；JSON 无法解析时会降级为纯文本提示。

## 示例 1：默认布局，重试、手动配置与帮助菜单

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "fill-group-code",
          "render_data": { "label": "🔄 再试一次", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/一键跳转免艾特配置 【在这里填入群号】",
            "enter": false,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        },
        {
          "id": "manual-guide",
          "render_data": { "label": "📖 手动配置", "style": 1 },
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
    },
    {
      "buttons": [
        {
          "id": "help-menu",
          "render_data": { "label": "🕹️ 玩玩其他的", "style": 1 },
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

## 示例 2：重新执行申请与帮助菜单

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "retry",
          "render_data": { "label": "🔄 再试一次", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/免艾特申请",
            "enter": true,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        },
        {
          "id": "help-menu",
          "render_data": { "label": "🕹️ 玩玩其他的", "style": 1 },
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

## 示例 3：只显示填写群号按钮

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "fill-group-code",
          "render_data": { "label": "🔢 填写群号后重试", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/qqbot-url ",
            "enter": false,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    }
  ]
}
```

## 示例 4：手动配置指南与帮助菜单

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "manual-guide",
          "render_data": { "label": "📖 查看手动配置指南", "style": 1 },
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
          "render_data": { "label": "🧭 打开帮助菜单", "style": 0 },
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

## 示例 5：两行布局，填写群号、指南与论坛

```json
{
  "rows": [
    {
      "buttons": [
        {
          "id": "fill-group-code",
          "render_data": { "label": "🔢 填写群号", "style": 1 },
          "action": {
            "type": 2,
            "permission": { "type": 2 },
            "data": "/一键跳转免艾特配置 【在这里填入群号】",
            "enter": false,
            "reply": false,
            "unsupport_tips": "请更新QQ版本后使用"
          }
        }
      ]
    },
    {
      "buttons": [
        {
          "id": "manual-guide",
          "render_data": { "label": "📖 手动配置指南", "style": 1 },
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
          "id": "forum",
          "render_data": { "label": "🌐 Koishi 论坛", "style": 0 },
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
