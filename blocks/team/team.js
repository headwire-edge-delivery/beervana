export default async function decorate(block) {
  console.log("team decorate", block);
  const teamMembers = [{}];
  let teamMemberIndex = 0;
  block.querySelectorAll(".team div > div > *").forEach((el, index) => {
    if (el.tagName === "HR") { 
        teamMemberIndex++; 
        teamMembers.push({})
        return; 
    }
    else {
        if (el.querySelector("picture")) {
            teamMembers[teamMemberIndex]["picture"] = el.querySelector("picture");
        } else {
            teamMembers[teamMemberIndex][el.tagName] = el;
        }
    }
    console.log("team els", el);
  });

  console.log("teamMembers", teamMembers);
  block.innerHTML = "";
  console.log("block", block);
  teamMembers.forEach((teamMember, index) => {
    const teamMemberBlock = document.createElement("div");
    teamMemberBlock.classList.add("team-member");
    const teamMemberInfo = document.createElement("div");
    teamMemberInfo.classList.add("team-member-info");
    teamMemberBlock.appendChild(teamMember.picture);

    teamMemberInfo.appendChild(teamMember.H3);
    teamMemberInfo.appendChild(teamMember.H4);
    teamMemberInfo.appendChild(teamMember.P);
    teamMemberBlock.appendChild(teamMemberInfo);
    
    block.appendChild(teamMemberBlock);
  });

}

