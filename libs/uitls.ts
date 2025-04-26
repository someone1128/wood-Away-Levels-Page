export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_SITE_URL || "https://dreamyroom.net"}${path}`;
}
