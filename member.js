function skillsMember (member) {
    const skills = member.skills;
    const skillsList = document.createElement('ul');
    skillsList.classList.add('skills');
    skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
    });
    return skillsList;
}