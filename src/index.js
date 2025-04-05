import page from 'page';

// import css
import './styles/lib.css';
import './styles/styles.css';
import { ThreeDSimulation } from './Simulations/ThreeDSimulation';
import { TwoDSimulation } from './Simulations/TwoDSimulation';

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

function isSubclassOf(ClassA, ClassB) {
    // get the prototype of ClassA
    const protoA = Object.getPrototypeOf(ClassA.prototype);
    
    // check if the prototype of ClassA is ClassB.prototype
    return protoA === ClassB.prototype;
  }

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

function loadSim(Sim, title, description = null, hasControls = true, hasGraphs = true) {
    // set header & tab title
    document.getElementById('header-title').innerHTML = title;
    document.getElementById('tab-title').innerHTML =
        `Physicsim (${title.split('(')[0].trim()})`;

    if (description) {
        document.getElementById('description').innerText = description;
    }

    // switch between 2 & 3d logic
    if (isSubclassOf(Sim, ThreeDSimulation)) { // 3d logic
        // init sim
        const sim = new Sim(
            document.getElementById('sim-wrapper'),
            document.getElementById('inputs-container'),
            document.getElementById('graphs-container'),
            document.getElementById('ctrl-wrapper'),
            document.getElementById('attr-wrapper')
        );

        sim.setup(stopLoading)
    }

    if (isSubclassOf(Sim, TwoDSimulation)) { // 2d logic
        // init simulation
        console.log('running...')
        const sim = new Sim(
            document.getElementById('sim-wrapper'),
            document.getElementById('inputs-container'),
            document.getElementById('ctrl-wrapper'),
            document.getElementById('attr-wrapper')
        );

        sim.setup(stopLoading);
    }

    // remove / add buttons based on sim settings
    if (hasControls == false) {
        document.getElementById('inputs-selector').style.display = 'none';
    }

    if (hasGraphs == false) {
        document.getElementById('graphs-selector').style.display = 'none';
    }

    // prompt hider
    document.getElementById('hide-btn').addEventListener('click', () => {
        let header = document.getElementById('header-wrapper');
        let btn = document.getElementById('hide-btn-img');

        if (header.style.display == 'none') {
            header.style.display = 'block';
            btn.src = '/static/prompt-close.png';
        } else {
            header.style.display = 'none';
            btn.src = '/static/prompt-open.png';
        }
    });


}

// routing system and chunk loading system
page('/nuclear-decay', () => {
    import('./Simulations/NuclearDecaySimulation').then((module) => {
        loadSim(
            module.default,
            'Nuclear Decay',
            'This simulation models the randomness within nuclear decay. Change the starting number of nuclei to see how the exponential model of decay becomes more accurate as the number of nuclei becomes statistically significant.',
            false,
            false
        );
    });
});

page('/wave-interference', () => {
    import('./Simulations/InterferenceSimulation').then((module) => {
        loadSim(
            module.default,
            'Wave Interference',
            'This simulation shows how interference of waves occurs as the path difference between two sources changes as an observer moves between them. Drag around on the simulation pane to manually move the observer.',
            false,
            false
        );
    });
});

page('/collisions', () => {
    import('./Simulations/CollisionsSimulation').then((module) => {
        loadSim(
            module.default, 
            'Collisions',
            'This simulation models 3d collisions. Download the data to check that conservation of momentum occurs in all dimensions: x, y and z.'
        );
    });
});

page('/circular-motion', () => {
    import('./Simulations/CircularMotionSimulation').then((module) => {
        loadSim(
            module.default, 
            'Circular Motion',
            'This simulation shows circular motion and how it is linked to simple harmonic motion.'
        );
    });
});

page('/projectile-motion', () => {
    import('./Simulations/ProjectileSimulation').then((module) => {
        loadSim(
            module.default, 
            'Projectile Motion',
            'This simulation shows displacement, velocity and acceleration time graphs for the vertical motion of a projectile under earth\'s gravitational field assuming g = 9.81 N/kg.'
        );
    });
});

page('/snells-law', () => {
    import('./Simulations/SnellsLawSimulation/SnellsLawSimulation').then(
        (module) => {
            loadSim(module.default, 'Snell\'s Law');
        },
    );
});

page('/cyclotron', () => {
    import('./Simulations/CyclotronSimulation').then((module) => {
        loadSim(
            module.default, 
            'Cyclotron (Non-Relativistic)',
            'This simulation showcases the acceleration of the cyclotron and the paths of different charged particles.'
        );
    });
});

page('/alpha-scattering', () => {
    import('./Simulations/ScatteringSimulation').then((module) => {
        loadSim(
            module.default,
            'Alpha Particle Scattering', 
            'This simulation provides an idealistic model for the alpha particle scattering experiment, showing how alpha particles at different distances from a nucleus are deflected.', 
            true, 
            false
        );
    });
});

page('*', () => {
    window.location.href = 'https://physicsim.co.uk';
});

// start router
page();