/** Chấm độ mạnh mật khẩu từ 0 đến 4: đủ 8 ký tự, có chữ hoa lẫn thường, có số, có ký tự đặc biệt. */
export function passwordScore(password: string) {
  if (!password) return 0;
  return [password.length >= 8, /[a-z]/.test(password) && /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
}
