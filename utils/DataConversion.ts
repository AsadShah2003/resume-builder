export function jsonToBase64(data: any): string {
  const base64String = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  return base64String;
}

export function base64ToJson(data: any): any {
  const jsonString = JSON.parse(decodeURIComponent(escape(atob(data))));
  return jsonString;
}
