export default async function decorate(block) {
  block.querySelectorAll(":scope > div")?.forEach((el, index) => {
    el.classList.add("team-member");
    const teamMemberPhoto = el.querySelector("picture");
    teamMemberPhoto.classList.add("team-member-photo");

    const teamMemberInfo = document.createElement("div");
    teamMemberInfo.classList.add("team-member-info");
    const teamMemberName = el.querySelector("h3");
    const teamMemberPosition = el.querySelector("h4");
    const teamMemberDescription = el.querySelector("p:last-child");

    if (teamMemberName) teamMemberInfo.appendChild(teamMemberName);
    if (teamMemberPosition) teamMemberInfo.appendChild(teamMemberPosition);
    if (teamMemberDescription) teamMemberInfo.appendChild(teamMemberDescription);

    el.innerHTML = "";
    el.appendChild(teamMemberPhoto);
    el.appendChild(teamMemberInfo);
  });
}
