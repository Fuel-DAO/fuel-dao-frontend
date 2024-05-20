const E8S = Math.pow(10, 8);

export const toE8s = (num?: number | bigint) => (num ? Number(num) * E8S : 0);
export const fromE8s = (num?: number | bigint) => (num ? Number(num) / E8S : 0);
