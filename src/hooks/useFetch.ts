import { useEffect, useState } from "react";

export const useFetch = (path: string) => {
	const [data, setData] = useState<any>({ message: "Loading..." });
	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		fetch(
			`https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${path}`,
			{ signal },
		)
			.then((resp) => resp.json)
			.then((data) => {
				setData(data);
			})
			.catch((err) => console.error(err));

		return () => {
			controller.abort();
		};
	}, []);

	return data.message;
};
