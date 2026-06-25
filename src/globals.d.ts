declare module "*.css";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif" {
	const src: string;
	export default src;
}
