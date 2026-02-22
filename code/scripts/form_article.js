document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const modals = document.querySelectorAll(".modal");
  const progressBar = document.querySelector(".progress");
  let currentStep = 0;
  const totalSteps = modals.length;

  function goToStep(step) {
    if (step < 0 || step >= totalSteps) return;
    currentStep = step;

    // Déplace le slider
    slider.style.transform = `translateX(-${currentStep * 100}%)`;

    // Met à jour la barre de progression
    const percent = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Écoute tous les boutons "Continuer"
  const buttons = document.querySelectorAll("form button");
  buttons.forEach((btn, index) => {
    // Active les boutons (retire disabled pour tester)

    btn.addEventListener("click", (e) => {
      e.preventDefault(); // ← empêche le rechargement de la page
      goToStep(currentStep + 1);
    });
  });

  // Initialise à l'étape 0
  goToStep(0);
});
