const PROBE_TIMEOUT_MS = 5000

export interface PickImageUrlResult {
  /** 最终选用的图片 URL（可能为空） */
  url?: string
  /** 是否开启了探测 */
  probed: boolean
  /** 开启探测时是否全部候选失败（已回退第一个非空项） */
  probeAllFailed: boolean
}

function normalizeUrlList(urls: readonly string[]): string[] {
  return (Array.isArray(urls) ? urls : [])
    .map((url) => (typeof url === 'string' ? url.trim() : ''))
    .filter((url) => url.length > 0)
}

/** 校验单个图片 URL：要求 200 直出、无重定向且 content-type 为 image/* */
async function checkImageUrl(url: string): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS)
  try {
    const response = await fetch(url, { redirect: 'follow', signal: controller.signal })
    const contentType = (response.headers.get('content-type') || '').toLowerCase()
    return response.status === 200 && !response.redirected && contentType.startsWith('image/')
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

/**
 * 从候选 URL 列表中选取图片地址。
 * - probe=false：直接取第一个非空项
 * - probe=true：按顺序逐个探测（200 直出 + 无重定向 + image/*），
 *   全部失败时回退第一个非空项并标记 probeAllFailed
 */
export async function pickImageUrl(
  urls: readonly string[],
  probe = false,
): Promise<PickImageUrlResult> {
  const candidates = normalizeUrlList(urls)
  const result: PickImageUrlResult = {
    url: candidates[0],
    probed: probe,
    probeAllFailed: false,
  }

  if (!probe || !candidates.length) return result

  for (const candidate of candidates) {
    if (await checkImageUrl(candidate)) {
      result.url = candidate
      return result
    }
  }

  result.probeAllFailed = true
  return result
}
