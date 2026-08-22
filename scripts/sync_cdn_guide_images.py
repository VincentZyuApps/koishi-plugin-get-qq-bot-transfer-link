"""
重要：doc/tutorial 下的中文文件名图片是原始文件，必须保留，不能删除或改名。
doc/images 下的英文文件名图片仅用于 CDN 直链。
以后中文原图更新后，重新运行本脚本即可覆盖并同步英文 CDN 副本。
"""

from pathlib import Path
from shutil import copy2


REPO_ROOT = Path(__file__).resolve().parent.parent

IMAGE_COPIES = {
    Path("doc/tutorial/早期灰度阶段/灰度测试阶段手机QQ点击url弹出的ui的操作提示.png"):
        Path("doc/images/transfer-link-guide.png"),
    Path("doc/tutorial/灰度结束阶段/3steps.灰度测试结束后手机QQ的ui的操作提示.png"):
        Path("doc/images/qq-settings-guide.png"),
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
