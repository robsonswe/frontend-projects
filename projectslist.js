const projects = [
  {
    name: "Finance Manager",
    techs: [
      "HTML",
      "TailwindCSS",
      "Typescript",
      "React",
      "NextJS",
      "PostgreSQL",
      "Express.JS",
      "Docker",
    ],
    ssname: "financemanager",
    github: "https://github.com/robsonswe/financemanager",
    preview:
      "https://github.com/robsonswe/financemanager/tree/main/website/screenshots",
  },
  {
    name: "eSports Page",
    techs: ["HTML", "TailwindCSS", "Typescript", "React", "NextJS"],
    ssname: "esports",
    github: "https://github.com/robsonswe/cs50xfinal",
    preview: "https://cs50xfinal.vercel.app/",
  },
  {
    name: "IP Address Tracker",
    techs: ["HTML", "CSS", "Javascript"],
    ssname: "iptrack-int",
    github: "https://github.com/robsonswe/frontend-projects/tree/iptrack-int",
    preview: "https://robsonswe.github.io/frontend-projects/iptrack-int",
  },
  {
    name: "URL Shortening Page",
    techs: ["HTML", "CSS", "Javascript", "React", "Sass"],
    ssname: "linkshort-int",
    github: "https://github.com/robsonswe/frontend-projects/tree/linkshort-int",
    preview: "https://robsonswe.github.io/frontend-projects/linkshort-int",
  },
  {
    name: "Weather App",
    techs: ["HTML", "CSS", "Javascript"],
    ssname: "weather",
    github: "https://github.com/robsonswe/weatherapp",
    preview: "https://robsonswe.github.io/weatherapp/",
  },
  {
    name: "Job listings with filter",
    techs: ["HTML", "TailwindCSS", "Javascript", "React"],
    ssname: "joblist-int",
    github: "https://github.com/robsonswe/frontend-projects/tree/joblist-int",
    preview: "https://robsonswe.github.io/frontend-projects/joblist-int",
  },
  {
    name: "eCommerce",
    techs: ["HTML", "TailwindCSS", "Javascript", "React"],
    ssname: "ecommerce",
    github: "https://github.com/robsonswe/ecommerce",
    preview: "https://robsonswe.github.io/ecommerce/",
  },
  {
    name: "Curriculum Generator",
    techs: ["HTML", "CSS", "Javascript", "React"],
    ssname: "curriculum",
    github: "https://github.com/robsonswe/cvgenerator",
    preview: "https://robsonswe.github.io/cvgenerator/",
  },
  {
    name: "Web Calculator",
    techs: ["HTML", "CSS", "Javascript"],
    ssname: "calculator",
    github: "https://github.com/robsonswe/web-calculator",
    preview: "https://robsonswe.github.io/web-calculator/",
  },
  {
    name: "Landing Page Template",
    techs: ["HTML", "CSS"],
    ssname: "landingpage",
    github: "https://github.com/robsonswe/lpage-template1",
    preview: "https://robsonswe.github.io/lpage-template1/",
  },
  {
    name: "Dashboard Template",
    techs: ["HTML", "CSS"],
    ssname: "dashboard",
    github: "https://github.com/robsonswe/dashboard-t1",
    preview: "https://robsonswe.github.io/dashboard-t1/",
  },
  {
    name: "Social Media Dashboard with Themes",
    techs: ["HTML", "CSS", "Javascript"],
    ssname: "smdt-junior",
    github: "https://github.com/robsonswe/frontend-projects/tree/smdt-junior",
    preview: "https://robsonswe.github.io/frontend-projects/smdt-junior",
  },
  {
    name: "Interactive card details",
    techs: ["HTML", "CSS", "Javascript"],
    ssname: "icdf-junior",
    github: "https://github.com/robsonswe/frontend-projects/tree/icdf-junior",
    preview: "https://robsonswe.github.io/frontend-projects/icdf-junior",
  },
  {
    name: "Product Preview Card",
    techs: ["HTML", "CSS"],
    ssname: "ppcc-nb",
    github: "https://github.com/robsonswe/frontend-projects/tree/ppcc-nb",
    preview: "https://robsonswe.github.io/frontend-projects/ppcc-nb",
  },
];

for (project of projects) {
  const main = document.getElementById("projectsList");

  let screenshot = document.createElement("img");
  screenshot.classList.add("screenshot");
  screenshot.src = "./screenshots/" + `${project.ssname}` + ".jpg";
  screenshot.alt = project.name;

  let projectName = document.createElement("h2");
  projectName.innerText = project.name;

  let techsList = document.createElement("ul");

  project.techs.forEach((tech) => {
    let li = document.createElement("li");
    li.innerText = tech;
    techsList.appendChild(li);
  });

  let techs = document.createElement("div");
  techs.classList.add("techs");
  techs.appendChild(techsList);

  let links = document.createElement("div");
  links.classList.add("links");

  let github = document.createElement("p");
  github.innerText = "Code";
  let githubLink = document.createElement("a");
  githubLink.href = project.github;
  githubLink.target = "_blank";

  let live = document.createElement("p");
  live.innerText = "Preview";
  let liveLink = document.createElement("a");
  liveLink.href = project.preview;

  liveLink.target = "_blank";

  let infos = document.createElement("div");
  infos.classList.add("infos");

  let LinksList = document.createElement("div");
  liveLink.appendChild(live);
  githubLink.appendChild(github);
  LinksList.appendChild(githubLink);
  LinksList.appendChild(liveLink);
  LinksList.classList.add("links");

  infos.appendChild(projectName);
  infos.appendChild(techs);
  infos.appendChild(LinksList);

  let div = document.createElement("div");
  div.classList.add("project");

  div.appendChild(screenshot);
  div.appendChild(infos);

  main.appendChild(div);
}
