export function upsertbabySitterController(babySitters: any[], newbabySitter: any) {
	const babySitterIndex = babySitters.findIndex((el) => el.id === newbabySitter.id);
	if (babySitterIndex === -1) {
		babySitters.push(newbabySitter);
	} else {
		babySitters[babySitterIndex] = {
			...babySitters[babySitterIndex],
			...newbabySitter,
		};
	}
	return babySitters;
}
