export class LocalStorageWorker {
	add(key: string, value: any) {
		console.log("ADD");
		const target = this.get(key);
		target.push(value);
		this.store(key, target);
	}

	get(key: string): any {
		if (key) {
			const item = localStorage.getItem(key);
			return !item ? [] : JSON.parse(item);
		}
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	has(key: string, value: any) {
		return this.indexOf(key, value) !== -1;
	}

	indexOf(key: string, value: any) {
		const target = this.get(key);
		return target.indexOf(value);
	}

	del(key: string, value: any) {
		let idx = this.indexOf(key, value);
		const newItem = this.get(key);
		if (idx !== -1) {
			newItem.splice(idx, 1);
		}
		this.store(key, newItem);
	}
	store(key: string, item: Array<any>[]) {
		localStorage.setItem(key, JSON.stringify(item));
	}
}
