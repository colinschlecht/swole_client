import React from 'react';

function MatchingProfile({ user }) {
	const {
		name,
		age,
		exercise_time,
		exercise_discipline,
		diet,
		gender_preference,
	} = user;

	const renderPersonal = (trait) => {
		const arr = [];
		for (let key in trait) {
			if (trait[key] && typeof trait[key] !== 'number') {
				const keyStr = key.split('_').join(' ');
				arr.push(keyStr);
			}
		}
		if (arr.length) return arr.join(', ');
		return 'none';
	};

	return (
		<div>
			<div>{renderPersonal(exercise_discipline)}</div>
		</div>
	);
}

export default MatchingProfile;
