import page from 'page';

// import css
import './styles/lib.css'
import './styles/styles2d.css';

// loading logic
let isLoading = true;
let loadingTexts = [
    'Setting quantum state...',
    'Accelerating protons!',
    'Diffracting light...',
    'Light: A wave or a particle?',
    'Checking conservation of momentum...',
    'Checking Newton\'s Laws...',
    'Reading up on Snell\'s Law...',
    'Correcting for parallax...',
];

function updateLoading(textElement) {
    // update loading text with a random statement from loadingTexts
    if (!isLoading) return;
    const randomIndex = Math.floor(Math.random() * loadingTexts.length);
    const text = loadingTexts[randomIndex];
    textElement.innerHTML = text;
    setTimeout(() => updateLoading(textElement), 500);
}

function stopLoading() {
    // close loading screen when triggered by setup() in sim
    if (!isLoading) return;
    isLoading = false;
    document.getElementById('body').firstElementChild.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingText = document.getElementById('loading-txt');
    updateLoading(loadingText);
});

function loadSim(Sim, title, description=null) {

    // set header & tab title
    document.getElementById('header-title').innerHTML = title;
    document.getElementById('tab-title').innerHTML = `Physicsim (${title.split('(')[0].trim()})`;

    if (description) {
        document.getElementById('description').innerText = description;
    }

    // init simulation
    const sim = new Sim(
        document.getElementById('sim-wrapper'),
        document.getElementById('inputs-wrapper'),
        document.getElementById('ctrl-wrapper'),
        document.getElementById('attr-wrapper')
    )

    sim.setup(stopLoading)
}

// routing system and chunk loading system
page('/2/nuclear-decay', () => {
    import('./Simulations/NuclearDecaySimulation').then(
        (module) => {
            loadSim(module.default, 'Nuclear Decay', "This simulation uses a Monte Carlo Simulation to model the randomness within nuclear decay. Change the starting number of nuclei to see how the exponential model of decay becomes more accurate as the number of nuclei becomes statistically significant.")
        }
    )
});


page('*', () => {
    window.location.href = 'https://physicsim.co.uk';
})


// start router
page();
