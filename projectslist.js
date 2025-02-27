// Import projects data from JSON file
async function loadProjectsData() {
  try {
    const response = await fetch('./projects.json');
    if (!response.ok) {
      throw new Error('Failed to load projects data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

// Initialize the page
async function initializePage() {
  const projects = await loadProjectsData();
  
  if (!projects.length) {
    displayErrorMessage('Failed to load projects data');
    return;
  }
  
  const sortedProjects = sortProjects(projects);
  const allTechs = extractAllTechnologies(sortedProjects);
  createTechFilters(allTechs);
  renderProjects(sortedProjects);
  
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
}

// Sort projects based on criteria
function sortProjects(projects) {
  return projects.sort((a, b) => {
    const featuredA = a.featured === true ? 1 : 0;
    const featuredB = b.featured === true ? 1 : 0;
    
    if (featuredA !== featuredB) {
      return featuredB - featuredA; // Featured projects come first
    }
    
    if (a.techs.length !== b.techs.length) {
      return b.techs.length - a.techs.length; // More techs come first
    }
    
    return a.name.localeCompare(b.name); // Alphabetical order
  });
}

// Extract all unique technologies from projects
function extractAllTechnologies(projects) {
  const techSet = new Set();
  projects.forEach(project => {
    project.techs.forEach(tech => {
      techSet.add(tech);
    });
  });
  return Array.from(techSet).sort();
}

// Create tech filter buttons
function createTechFilters(techs) {
  const techFiltersContainer = document.getElementById('tech-filters');
  techs.forEach(tech => {
    const filterBtn = document.createElement('button');
    filterBtn.classList.add('tech-filter');
    filterBtn.dataset.tech = tech;
    filterBtn.textContent = tech;
    filterBtn.addEventListener('click', () => toggleFilter(filterBtn));
    techFiltersContainer.appendChild(filterBtn);
  });
}

// Toggle active state of a filter button and apply filters
function toggleFilter(filterBtn) {
  filterBtn.classList.toggle('active');
  applyFilters();
}

// Get all active filters
function getActiveFilters() {
  return Array.from(document.querySelectorAll('.tech-filter.active')).map(filter => filter.dataset.tech);
}

// Apply active filters to projects
function applyFilters() {
  const activeFilters = getActiveFilters();
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    const projectTechs = Array.from(project.querySelectorAll('.techs li')).map(li => li.textContent);
    project.classList.toggle('filtered-out', activeFilters.length && !activeFilters.some(filter => projectTechs.includes(filter)));
  });
  checkForNoProjects();
}

// Clear all active filters
function clearFilters() {
  document.querySelectorAll('.tech-filter.active').forEach(filter => filter.classList.remove('active'));
  document.querySelectorAll('.project').forEach(project => project.classList.remove('filtered-out'));
  const noProjectsMsg = document.querySelector('.no-projects-message');
  if (noProjectsMsg) noProjectsMsg.remove();
}

// Check if no projects are visible and show message
function checkForNoProjects() {
  const projectsList = document.getElementById('projectsList');
  let noProjectsMsg = document.querySelector('.no-projects-message');
  if (!document.querySelector('.project:not(.filtered-out)')) {
    if (!noProjectsMsg) {
      noProjectsMsg = document.createElement('div');
      noProjectsMsg.classList.add('no-projects-message');
      noProjectsMsg.innerHTML = '<h3>No matching projects</h3><p>Try selecting different technologies or clear all filters to see all projects.</p>';
      projectsList.appendChild(noProjectsMsg);
    }
  } else if (noProjectsMsg) {
    noProjectsMsg.remove();
  }
}

// Render all projects to the page
function renderProjects(projects) {
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  projects.forEach(project => {
    const div = document.createElement('div');
    div.classList.add('project');
    
    const screenshotContainer = document.createElement('div');
    screenshotContainer.classList.add('screenshot-container');
    
    const screenshot = document.createElement('img');
    screenshot.classList.add('screenshot');
    screenshot.src = project.screenshot;
    screenshot.alt = project.name;
    screenshotContainer.appendChild(screenshot);
    
    const infos = document.createElement('div');
    infos.classList.add('infos');
    
    const projectName = document.createElement('h2');
    projectName.textContent = project.name;
    
    const techs = document.createElement('div');
    techs.classList.add('techs');
    
    const techsList = document.createElement('ul');
    project.techs.forEach(tech => {
      const li = document.createElement('li');
      li.textContent = tech;
      techsList.appendChild(li);
    });
    techs.appendChild(techsList);
    
    const links = document.createElement('div');
    links.classList.add('links');
    
    const githubLink = document.createElement('a');
    githubLink.href = project.github;
    githubLink.target = '_blank';
    githubLink.textContent = 'Code';
    
    const previewLink = document.createElement('a');
    previewLink.href = project.preview;
    previewLink.target = '_blank';
    previewLink.textContent = 'Preview';
    
    links.appendChild(githubLink);
    links.appendChild(previewLink);
    
    infos.appendChild(projectName);
    infos.appendChild(techs);
    infos.appendChild(links);
    
    div.appendChild(screenshotContainer);
    div.appendChild(infos);
    
    projectsList.appendChild(div);
  });
  document.querySelectorAll('.project').forEach((card, index) => card.style.animationDelay = `${index * 0.05}s`);
}

// Display error message if data loading fails
function displayErrorMessage(message) {
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = `<div class='no-projects-message'><h3>Error</h3><p>${message}</p></div>`;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);