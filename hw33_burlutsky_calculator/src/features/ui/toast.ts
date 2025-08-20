export type ToastDetail = { message: string; timeout?: number };

export function showToast(message: string, timeout: number = 2000) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<ToastDetail>("app:toast", { detail: { message, timeout } }));
  }
}
