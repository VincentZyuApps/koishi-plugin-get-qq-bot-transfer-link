"""
💡 重要：doc/tutorial 下的中文文件名图片是原始文件，必须保留，不能删除或改名。
🔄 中文原图更新后，重新运行本脚本即可覆盖并同步 doc/images 下的英文副本。

🟧 【✅ 可用于 QQ Bot Markdown 内嵌图片】Gitee Raw 使用 doc/images 下的英文文件名副本，地址格式为：
🔗 https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/images/<file>.png
🖼️ https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/images/qqbot-url-transfer-link.png
🖼️ https://gitee.com/vincent-zyu/koishi-plugin-get-qq-bot-transfer-link/raw/main/doc/images/qqbot-guide-ui-settings.png

⬛ 【❌ 不可用于 QQ Bot Markdown 内嵌图片】GitHub Raw 使用同一份英文文件名副本，地址格式为：
🔗 https://raw.githubusercontent.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/main/doc/images/<file>.png
🖼️ https://raw.githubusercontent.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/main/doc/images/qqbot-url-transfer-link.png
🖼️ https://raw.githubusercontent.com/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link/main/doc/images/qqbot-guide-ui-settings.png

🟦 【❌ 不可用于 QQ Bot Markdown 内嵌图片】jsDelivr CDN 也使用同一份英文文件名副本，地址格式为：
🔗 https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link@main/doc/images/<file>.png
🖼️ https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link@main/doc/images/qqbot-url-transfer-link.png
🖼️ https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-get-qq-bot-transfer-link@main/doc/images/qqbot-guide-ui-settings.png
"""

from pathlib import Path
from shutil import copy2


REPO_ROOT = Path(__file__).resolve().parent.parent

IMAGE_COPIES = {
    Path("doc/tutorial/早期灰度阶段/灰度测试阶段手机QQ点击url弹出的ui的操作提示.png"):
        Path("doc/images/qqbot-url-transfer-link.png"),
    Path("doc/tutorial/灰度结束阶段/3steps.灰度测试结束后手机QQ的ui的操作提示.png"):
        Path("doc/images/qqbot-guide-ui-settings.png"),
}


def main() -> None:
    for source_relative, destination_relative in IMAGE_COPIES.items():
        source = REPO_ROOT / source_relative
        destination = REPO_ROOT / destination_relative

        if not source.is_file():
            raise FileNotFoundError(f"中文原图不存在：{source}")

        destination.parent.mkdir(parents=True, exist_ok=True)
        copy2(source, destination)
        print(f"已同步：{source_relative} -> {destination_relative}")


if __name__ == "__main__":
    main()
