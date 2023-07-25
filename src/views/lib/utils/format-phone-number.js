export function formatPhoneNumber(number) {
  // '01012345678'을 '010-1234-5678' 형식으로 변경
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}
