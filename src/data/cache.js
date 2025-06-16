const _cache = {};

export function get(path) {
  return _cache[path];
}

export function set(path, data) {
  _cache[path] = data;
}
