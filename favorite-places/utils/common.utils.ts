export function generateUniqueId() {
  return `${new Date().toString()}${Math.random().toString()}`;
}
