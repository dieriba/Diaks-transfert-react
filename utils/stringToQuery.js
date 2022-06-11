function serializeObject(obj) {
	let str = '';

	if(Object.keys(obj).length === 0){
		return str = '';
	}

	str = '&';
	for(let i = 0; i < Object.keys(obj).length; i++) {
		let key = Object.keys(obj)[i];
		if (i === Object.keys(obj).length - 1)
			str += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
		else
			str += encodeURIComponent(key) + '=' +  encodeURIComponent(obj[key]) + '&';
	}
	return str;
}

module.exports = {
	serializeObject
};