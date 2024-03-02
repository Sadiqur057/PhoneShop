function hideElementById(elementId){
  const element = document.getElementById(elementId);
  element.classList.add('hidden');
}

function showElementById(elementId){
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
}

function showElementTextById(elementId,value){
  const element = document.getElementById(elementId);
  element.innerText = value;
}