// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	type PokemonType = {
		id: string,
		name: string,
		image: string
	}
	type LoaderType = {
		size: string | number;
		color: string;
		unit: string;
		duration: string;
		pause: boolean;
		ballTopLeft: string;
		ballTopRight: string;
		ballBottomLeft: string;
		ballBottomRight: string;
	}
}

export { };
