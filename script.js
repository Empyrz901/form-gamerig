const LABELS = {
    purpose: {
        'gaming': 'Gaming',
        'gaming-streaming': 'Gaming + streaming',
        'gaming-content': 'Gaming + content creation',
        'general': 'General use',
    },
    colorScheme: {
        'standard': 'Standard / best value',
        'white-only': 'White only',
        'black': 'Black',
        'mixed': 'Black & white',
    },
    casePreference: {
        'no-preference': 'No preference',
        'specific': 'Specific case reference',
    },
    motherboardPreference: {
        'no-preference': 'No preference',
        'specific': 'Specific motherboard reference',
    },
    cpuPreference: {
        'no-preference': 'No preference / best value',
        'brand': 'Brand preference only',
        'specific': 'I have a model in mind',
    },
    rgbPreference: {
        'no': 'No RGB',
        'minimal': 'Minimal RGB',
        'moderate': 'Moderate RGB',
        'full': 'Full RGB',
    },
    cpuBrand: {
        'intel': 'Intel',
        'amd': 'AMD',
        'no-preference': 'No preference',
    },
    gpuBrand: {
        'nvidia': 'NVIDIA',
        'amd': 'AMD',
        'no-preference': 'No preference',
    },
    gpuPreference: {
        'no-preference': 'No preference / best value',
        'brand': 'Brand preference only',
        'specific': 'I have a model in mind',
    },
    ramPreference: {
        'no-preference': 'No preference',
        'specific': 'Specific capacity',
    },
    coolingPreference: {
        'no-preference': 'No preference / best fit',
        'air': 'Ventirad / air cooler',
        'aio': 'AIO liquid cooler',
        'specific': 'I have a model in mind',
    },
    coolingType: {
        'air-budget': 'Air - budget',
        'air-mid': 'Air - mid-range',
        'air-high': 'Air - high-end',
        'aio240': 'AIO 240mm',
        'aio280': 'AIO 280mm',
        'aio360': 'AIO 360mm',
    },
    ramCapacity: {
        '16gb': '16GB (2x8)',
        '32gb': '32GB (2x16)',
        '48gb': '48GB (2x24)',
        '64gb': '64GB (2x32)',
        '96gb': '96GB (2x48)',
    },
    ramSpeed: {
        '5600': 'DDR5-5600',
        '6000': 'DDR5-6000',
        '6400': 'DDR5-6400',
        '6800': 'DDR5-6800+',
    },
    vram: {
        '8gb': '8GB',
        '12gb': '12GB',
        '16gb': '16GB',
        '24gb': '24GB',
        '32gb': '32GB+',
    },
    caseIntakeFans: {
        'stock': 'Stock',
        '1x120': '+1x 120mm',
        '2x120': '+2x 120mm',
        '3x120': '+3x 120mm (full front)',
        '2x140': '+2x 140mm',
    },
    caseExhaustFans: {
        'stock': 'Stock',
        '1x120': '1x 120mm (rear)',
        '1x140': '1x 140mm (rear)',
        '2x120': '2x 120mm (top)',
        '1x120-1x140': '1x 120mm rear + 1x 140mm top',
    },
    fanPreference: {
        'no-preference': 'No preference / builder decides',
        'stock': 'Stock fans only',
        'specific': 'Specific fan layout',
    },
    storagePreference: {
        'no-preference': 'No preference',
        'specific': 'Specific SSD capacity',
    },
    ssdCapacity: {
        '500gb': '500GB',
        '1tb': '1TB',
        '2tb': '2TB',
        '4tb': '4TB',
    },
    additionalStorage: {
        'none': 'None',
        'ssd-additional': 'Extra SSD',
        'hdd-eco': 'HDD (archival)',
        'ssd-hdd': 'SSD + HDD',
    },
    psuWattage: {
        '750w': '750W',
        '850w': '850W',
        '1000w': '1000W',
        '1200w': '1200W+',
    },
    usbPortsNeeded: {
        '4': '4 ports',
        '6': '6 ports',
        '8': '8 ports',
        '10-plus': '10+ ports',
    },
};

// CPU TDP / PL2 (W). Used to bump PSU recommendation for power-hungry chips.
const CPU_TDP_W = {
    // Intel Core Ultra (LGA1851) - total package power approx
    '285k': 250, '265k': 250, '265kf': 250, '245k': 159, '245kf': 159, '235': 159,
    // Intel 14th / 13th gen
    '14900k': 253, '14900kf': 253, '14900': 219, '14700k': 253, '14700kf': 253, '14700': 219,
    '14600k': 181, '14600kf': 181, '14600': 154, '14500': 154, '14400': 148,
    '13900k': 253, '13900ks': 253, '13700k': 253, '13600k': 181, '13500': 154, '13400': 148,
    // AMD Ryzen 9000
    '9950x3d': 170, '9950x': 170, '9900x3d': 120, '9900x': 120, '9800x3d': 120,
    '9700x': 65, '9600x': 65,
    // AMD Ryzen 7000
    '7950x3d': 120, '7950x': 170, '7900x3d': 120, '7900x': 170, '7800x3d': 120,
    '7700x': 105, '7700': 65, '7600x': 105, '7600': 65,
};

// Vendor-recommended PSU wattage per GPU. Already includes transient headroom.
const GPU_PSU_REC = {
    // NVIDIA RTX 50
    '5090': 1000, '5080': 850, '5070 ti': 750, '5070': 650, '5060 ti': 600, '5060': 550,
    // NVIDIA RTX 40
    '4090': 1000, '4080 super': 850, '4080': 850,
    '4070 ti super': 750, '4070 ti': 700, '4070 super': 700, '4070': 650,
    '4060 ti': 600, '4060': 550,
    // AMD RX 9000
    '9070 xt': 850, '9070': 750, '9060 xt': 600, '9060': 550,
    // AMD RX 7000
    '7900 xtx': 800, '7900 xt': 750, '7800 xt': 700, '7700 xt': 700, '7600 xt': 600, '7600': 550,
};

function findInDB(modelText, db) {
    if (!modelText) return { key: null, value: null };
    const lc = modelText.toLowerCase();
    let bestKey = null;
    for (const key of Object.keys(db)) {
        if (lc.includes(key) && (!bestKey || key.length > bestKey.length)) {
            bestKey = key;
        }
    }
    return bestKey ? { key: bestKey, value: db[bestKey] } : { key: null, value: null };
}

function recommendPSUWatts(cpuModel, gpuModel) {
    const gpu = findInDB(gpuModel, GPU_PSU_REC);
    const cpu = findInDB(cpuModel, CPU_TDP_W);
    if (!gpu.value && !cpu.value) return null;
    let watts = gpu.value || 650;
    if (cpu.value && cpu.value >= 200) watts = Math.max(watts, (gpu.value || 600) + 100);
    return { watts, gpu: gpu.key, cpu: cpu.key };
}

function parsePSUWatts(value) {
    const m = (value || '').match(/(\d+)/);
    return m ? parseInt(m[1], 10) : null;
}

const FORM_FACTORS = {
    itx: { label: 'Mini-ITX', rank: 1 },
    matx: { label: 'Micro-ATX', rank: 2 },
    atx: { label: 'ATX', rank: 3 },
    eatx: { label: 'E-ATX', rank: 4 },
};

const KNOWN_CASE_FORM_FACTORS = {
    'fractal core 1000': 'matx',
    'nzxt h7 flow': 'atx',
    'corsair 4000d': 'atx',
    'lian li o11 dynamic': 'atx',
    'fractal north': 'atx',
};

const KNOWN_MOTHERBOARD_FORM_FACTORS = {
    'asus rog strix b650e-e': 'atx',
    'rog strix b650e-f': 'atx',
    'asus rog strix b650e-f': 'atx',
    'rog strix x870e-e': 'atx',
    'asus rog strix x870e-e': 'atx',
    'asus tuf b650e-e': 'atx',
    'tuf gaming b650e-e': 'atx',
    'x870e-e': 'atx',
    'b650e-f': 'atx',
    'b650e-e': 'atx',
};

function normalizeFormFactorText(value) {
    return (value || '')
        .toLowerCase()
        .replace(/[_/]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function findKnownFormFactor(value, db) {
    const text = normalizeFormFactorText(value);
    let bestKey = null;
    for (const key of Object.keys(db)) {
        if (text.includes(key) && (!bestKey || key.length > bestKey.length)) {
            bestKey = key;
        }
    }
    return bestKey ? db[bestKey] : null;
}

function inferFormFactor(value, knownModels = {}) {
    const known = findKnownFormFactor(value, knownModels);
    if (known) return known;

    const text = normalizeFormFactorText(value);
    if (!text) return null;

    if (/(?:^|\b)(?:e\s*-?\s*atx|eatx|extended\s+atx)(?:\b|$)/i.test(text)) return 'eatx';
    if (/(?:^|\b)(?:micro\s*-?\s*atx|m\s*-?\s*atx|matx|u\s*-?\s*atx|uatx)(?:\b|$)/i.test(text)) return 'matx';
    if (/(?:^|\b)(?:mini\s*-?\s*itx|m\s*-?\s*itx|itx)(?:\b|$)/i.test(text)) return 'itx';
    if (/(?:^|\b)atx(?:\b|$)/i.test(text)) return 'atx';

    return null;
}

function getMotherboardCompatibility(caseText, motherboardText) {
    const caseFactor = inferFormFactor(caseText, KNOWN_CASE_FORM_FACTORS);
    const motherboardFactor = inferFormFactor(motherboardText, KNOWN_MOTHERBOARD_FORM_FACTORS);

    if (!caseFactor || !motherboardFactor) {
        return { status: 'unknown', caseFactor, motherboardFactor };
    }

    const fits = FORM_FACTORS[motherboardFactor].rank <= FORM_FACTORS[caseFactor].rank;
    return { status: fits ? 'ok' : 'invalid', caseFactor, motherboardFactor };
}

const GAMING_PRESET = {
    case: 'NZXT H7 Flow 2024 (~133 CHF)',
    casePreference: 'specific',
    budget: '1580',
    purpose: 'gaming',
    setupPurpose: '1440p gaming with strong value parts and quiet daily use',
    colorScheme: 'standard',
    rgbPreference: 'minimal',
    motherboardPreference: 'specific',
    usbPortsNeeded: '8',
    wifiEnabled: true,
    overclockVRM: true,
    motherboardModel: 'ROG STRIX B650E-F GAMING WIFI (~170 CHF)',
    cpuPreference: 'specific',
    cpuBrand: 'amd',
    cpuModel: 'AMD Ryzen 7 7800X3D (~234 CHF)',
    ramPreference: 'specific',
    ramCapacity: '32gb',
    ramSpeed: '6000',
    ramBrand: 'G.Skill / Corsair, 32GB DDR5-6000 (~340 CHF)',
    gpuPreference: 'specific',
    gpuBrand: 'amd',
    vram: '16gb',
    gpuModel: 'AMD Radeon RX 9060 XT 16GB (~365 CHF, varies by AIB)',
    coolingPreference: 'specific',
    coolingType: 'air-budget',
    coolingBrand: 'Thermalright Peerless Assassin 120 SE (~60 CHF)',
    fanPreference: 'specific',
    caseIntakeFans: '2x120',
    caseExhaustFans: '1x120',
    fanBrand: 'Arctic P12 PWM (~7.50 CHF each)',
    storagePreference: 'specific',
    ssdCapacity: '1tb',
    additionalStorage: 'none',
    psuWattage: '850w',
    psuBrand: 'NZXT C850 Gold ATX 3.1 fully modular (~100 CHF)',
    psuModular: true,
    notes: 'Gaming-focused build around the 7800X3D and RX 9060 XT. Budget air cooler (Peerless Assassin 120 SE) handles the 7800X3D quietly. Approx. total: ~1,525 CHF without DRAM cache SSD, or ~1,580 CHF with a DRAM cache NVMe SSD (case 133 + board 170 + CPU 234 + RAM 340 + GPU 365 + cooler 60 + SSD 100/155 + PSU 100 + 3x fans 22).',
};

const STREAMING_PRESET = {
    case: '',
    casePreference: 'no-preference',
    budget: '2650',
    purpose: 'gaming-streaming',
    setupPurpose: 'High-resolution gaming, streaming, OBS overlays, browser tabs, and light video editing',
    colorScheme: 'standard',
    rgbPreference: 'minimal',
    motherboardPreference: 'specific',
    usbPortsNeeded: '8',
    wifiEnabled: true,
    overclockVRM: true,
    motherboardModel: 'ROG STRIX B650E-F GAMING WIFI (~170 CHF)',
    cpuPreference: 'specific',
    cpuBrand: 'amd',
    cpuModel: 'AMD Ryzen 7 9800X3D',
    ramPreference: 'specific',
    ramCapacity: '64gb',
    ramSpeed: '6000',
    ramBrand: '64GB (2x32GB) DDR5-6000 CL30',
    gpuPreference: 'specific',
    gpuBrand: 'nvidia',
    vram: '16gb',
    gpuModel: 'NVIDIA RTX 5080 16GB GDDR7 (~1,100 CHF)',
    coolingPreference: 'no-preference',
    fanPreference: 'no-preference',
    storagePreference: 'specific',
    ssdCapacity: '2tb',
    additionalStorage: 'none',
    psuWattage: '1000w',
    psuBrand: 'NZXT C1000W ATX 3.1 fully modular',
    psuModular: true,
    notes: 'Streaming performance build. CPU: AMD Ryzen 7 9800X3D, the current peak of gaming CPUs with faster clocks and improved thermal management over the 7800X3D. GPU: NVIDIA RTX 5080 16GB GDDR7, a major step up for high-resolution gaming textures and next-gen NVENC dual encoders for crisp streaming. RAM: 64GB (2x32GB) DDR5-6000 CL30 for gaming while running OBS, browser tabs, stream overlays, and editing tools. Board: ROG STRIX B650E-F GAMING WIFI kept for robust VRMs and PCIe 5.0 GPU support. PSU: NZXT C1000W ATX 3.1 fully modular with overhead for transient spikes and a dedicated 12V-2x6 cable. Storage: 2TB NVMe SSD such as WD Black SN850X for fast load times and local VOD/game recording space. Estimated cost: ~2,400-2,650 CHF, driven heavily by the RTX 5080 around ~1,100 CHF in Switzerland.',
};

const EXTREME_PRESET = {
    case: '',
    casePreference: 'no-preference',
    budget: '4600',
    purpose: 'gaming-content',
    setupPurpose: 'Extreme gaming, workstation rendering, high-bitrate recording, streaming, and capture-card workflows',
    colorScheme: 'standard',
    rgbPreference: 'minimal',
    motherboardPreference: 'specific',
    usbPortsNeeded: '10-plus',
    wifiEnabled: true,
    ethernet10gb: true,
    overclockVRM: true,
    motherboardModel: 'ROG STRIX X870E-E GAMING WIFI',
    cpuPreference: 'specific',
    cpuBrand: 'amd',
    cpuModel: 'AMD Ryzen 9 9950X3D (16 cores)',
    ramPreference: 'specific',
    ramCapacity: '64gb',
    ramSpeed: '6000',
    ramBrand: '64GB (2x32GB) DDR5-6000 CL30',
    gpuPreference: 'specific',
    gpuBrand: 'nvidia',
    vram: '32gb',
    gpuModel: 'NVIDIA RTX 5090 32GB GDDR7 (~2,400-2,600 CHF)',
    coolingPreference: 'aio',
    coolingType: 'aio360',
    fanPreference: 'no-preference',
    storagePreference: 'specific',
    ssdCapacity: '4tb',
    additionalStorage: 'none',
    psuWattage: '1200w',
    psuBrand: 'Seasonic Vertex GX-1200W ATX 3.1',
    psuModular: true,
    notes: 'Extreme creator build. CPU: AMD Ryzen 9 9950X3D, a 16-core hybrid chip combining heavy multi-threaded performance with 3D V-Cache for top-tier gaming and workstation rendering. GPU: NVIDIA RTX 5090 32GB GDDR7, the flagship option for maximum settings, uncompressed local recording, and streaming. RAM: 64GB (2x32GB) DDR5-6000 CL30 retained for premium stability. Board: ROG STRIX X870E-E GAMING WIFI for X870E chipset features, more dedicated PCIe lanes, USB4, capture cards, and high-bandwidth external drives. PSU: Seasonic Vertex GX-1200W ATX 3.1 for premium power delivery to the RTX 5090 and 16-core CPU under combined load. Storage: 4TB NVMe SSD such as Crucial T500 or similar for high-bitrate footage and large game libraries. Estimated cost: ~4,200-4,600 CHF, largely because a standalone RTX 5090 is around ~2,400-2,600 CHF on the Swiss market.',
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rigConfigForm');
    const rgbSelect = document.getElementById('rgbPreference');
    const strimerOption = document.getElementById('strimerOption');
    const rgbFanOption = document.getElementById('rgbFanOption');
    const preferenceControls = Array.from(document.querySelectorAll('[data-preference-control]'));
    const conditionalFields = Array.from(document.querySelectorAll('[data-show-when]'));

    window.loadPresetGaming = () => {
        loadPreset(GAMING_PRESET);
    };

    window.loadPresetStreaming = () => {
        loadPreset(STREAMING_PRESET);
    };

    window.loadPresetExtreme = () => {
        loadPreset(EXTREME_PRESET);
    };

    window.resetForm = () => {
        form.reset();
        updateConditionalFields();
        updatePSUWarning();
        updateMotherboardCompatibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    rgbSelect.addEventListener('change', updateConditionalFields);
    preferenceControls.forEach((el) => {
        el.addEventListener('change', updateConditionalFields);
    });
    form.addEventListener('reset', () => {
        setTimeout(() => {
            updateConditionalFields();
            updatePSUWarning();
            updateMotherboardCompatibility();
        }, 0);
    });

    const psuWattageSelect = document.getElementById('psuWattage');
    const cpuModelInput = document.getElementById('cpuModel');
    const gpuModelInput = document.getElementById('gpuModel');
    const psuWarning = document.getElementById('psuWarning');
    const caseInput = document.getElementById('case');
    const motherboardModelInput = document.getElementById('motherboardModel');
    const motherboardCompatibility = document.getElementById('motherboardCompatibility');

    [cpuModelInput, gpuModelInput, psuWattageSelect].forEach((el) => {
        el.addEventListener('input', updatePSUWarning);
        el.addEventListener('change', updatePSUWarning);
    });

    [caseInput, motherboardModelInput].forEach((el) => {
        el.addEventListener('input', updateMotherboardCompatibility);
        el.addEventListener('change', updateMotherboardCompatibility);
    });

    function updateMotherboardCompatibility() {
        const result = getMotherboardCompatibility(caseInput.value, motherboardModelInput.value);
        motherboardModelInput.setCustomValidity('');
        motherboardModelInput.classList.remove('field-error');
        motherboardCompatibility.className = 'hidden';
        motherboardCompatibility.textContent = '';

        if (!caseInput.value.trim() || !motherboardModelInput.value.trim()) {
            return true;
        }

        if (result.status === 'unknown') {
            const knownParts = [];
            if (result.caseFactor) knownParts.push(`case: ${FORM_FACTORS[result.caseFactor].label}`);
            if (result.motherboardFactor) knownParts.push(`board: ${FORM_FACTORS[result.motherboardFactor].label}`);

            motherboardCompatibility.className = 'info-box';
            motherboardCompatibility.textContent = knownParts.length
                ? `Detected ${knownParts.join(', ')}. Add the missing form factor if you want a fit check.`
                : 'Add a form factor such as ATX, mATX, or Mini-ITX to either field to check motherboard fit.';
            return true;
        }

        const caseLabel = FORM_FACTORS[result.caseFactor].label;
        const boardLabel = FORM_FACTORS[result.motherboardFactor].label;

        if (result.status === 'invalid') {
            const message = `${boardLabel} motherboards do not fit in a ${caseLabel} case. Choose a ${caseLabel} or smaller board, or a larger case.`;
            motherboardModelInput.setCustomValidity(message);
            motherboardModelInput.classList.add('field-error');
            motherboardCompatibility.className = 'warning';
            motherboardCompatibility.textContent = message;
            return false;
        }

        motherboardCompatibility.className = 'info-box info-box-ok';
        motherboardCompatibility.textContent = `${boardLabel} motherboard fits in a ${caseLabel} case.`;
        return true;
    }

    function updatePSUWarning() {
        const rec = recommendPSUWatts(cpuModelInput.value, gpuModelInput.value);
        const selected = parsePSUWatts(psuWattageSelect.value);

        if (!rec) {
            psuWarning.classList.add('hidden');
            psuWarning.textContent = '';
            return;
        }

        if (!selected) {
            psuWarning.classList.remove('hidden');
            psuWarning.className = 'info-box';
            psuWarning.textContent = `Recommended PSU: ${rec.watts}W or higher (based on your CPU/GPU).`;
            return;
        }

        if (selected < rec.watts) {
            psuWarning.classList.remove('hidden');
            psuWarning.className = 'warning';
            psuWarning.textContent = `Heads up: ${selected}W may be insufficient. Recommended ${rec.watts}W+ for this CPU/GPU combo.`;
        } else {
            psuWarning.classList.remove('hidden');
            psuWarning.className = 'info-box info-box-ok';
            psuWarning.textContent = `${selected}W is sufficient (recommended ${rec.watts}W+).`;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!updateMotherboardCompatibility() || !form.checkValidity()) {
            form.reportValidity();
            return;
        }
        generatePDF();
    });

    updatePSUWarning();
    updateMotherboardCompatibility();

    function loadPreset(preset) {
        form.reset();
        applyPreset(preset);
        updateConditionalFields();
        updatePSUWarning();
        updateMotherboardCompatibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function applyPreset(preset) {
        for (const [key, value] of Object.entries(preset)) {
            const el = document.getElementById(key);
            if (!el) continue;
            if (el.type === 'checkbox') {
                el.checked = Boolean(value);
            } else {
                el.value = value;
            }
        }
    }

    function updateConditionalFields() {
        const rgb = rgbSelect.value;
        const wantsRGB = rgb === 'moderate' || rgb === 'full';
        toggle(strimerOption, wantsRGB);
        toggle(rgbFanOption, wantsRGB);
        if (!wantsRGB) {
            document.getElementById('strimerCables').checked = false;
            document.getElementById('rgbFans').checked = false;
        }

        preferenceControls.forEach((control) => {
            const target = document.getElementById(control.dataset.preferenceControl);
            if (!target) return;
            const show = shouldShowPreferenceDetails(control);
            toggle(target, show);
            if (!show) clearFormControls(target);
        });
        conditionalFields.forEach((field) => {
            const show = shouldShowConditionalField(field);
            toggle(field, show);
            if (!show) clearFormControls(field);
        });
        updateMotherboardCompatibility();
        updatePSUWarning();
    }

    function toggle(el, show) {
        el.classList.toggle('hidden', !show);
    }

    function shouldShowPreferenceDetails(control) {
        if (control.id === 'additionalStorage') {
            return Boolean(control.value && control.value !== 'none');
        }
        return Boolean(control.value && control.value !== 'no-preference' && control.value !== 'stock');
    }

    function clearFormControls(root) {
        root.querySelectorAll('input, select, textarea').forEach((el) => {
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = false;
            } else {
                el.value = '';
            }
            el.setCustomValidity('');
            el.classList.remove('field-error');
        });
    }

    function shouldShowConditionalField(field) {
        const [controlId, expectedValue] = field.dataset.showWhen.split(':');
        const control = document.getElementById(controlId);
        return Boolean(control && control.value === expectedValue);
    }

    async function generatePDF() {
        const jsPDF = window.jspdf?.jsPDF;
        if (!jsPDF) {
            alert('PDF library failed to load. Check your internet connection and refresh.');
            return;
        }

        const config = collectConfig();
        savePreferencePDF(config, jsPDF);
    }

    function collectConfig() {
        const data = new FormData(form);
        const get = (k) => data.get(k) || '';
        const bool = (k) => data.get(k) === 'on' || data.get(k) === 'true';

        return {
            case: get('case'),
            casePreference: get('casePreference'),
            budget: get('budget'),
            purpose: get('purpose'),
            setupPurpose: get('setupPurpose'),
            colorScheme: get('colorScheme'),
            rgbPreference: get('rgbPreference'),
            strimerCables: bool('strimerCables'),
            motherboardPreference: get('motherboardPreference'),
            usbPortsNeeded: get('usbPortsNeeded'),
            wifiEnabled: bool('wifiEnabled'),
            ethernet10gb: bool('ethernet10gb'),
            overclockVRM: bool('overclockVRM'),
            motherboardModel: get('motherboardModel'),
            cpuPreference: get('cpuPreference'),
            cpuBrand: get('cpuBrand'),
            cpuModel: get('cpuModel'),
            ramPreference: get('ramPreference'),
            ramCapacity: get('ramCapacity'),
            ramSpeed: get('ramSpeed'),
            ramBrand: get('ramBrand'),
            gpuPreference: get('gpuPreference'),
            gpuBrand: get('gpuBrand'),
            vram: get('vram'),
            gpuModel: get('gpuModel'),
            coolingPreference: get('coolingPreference'),
            coolingType: get('coolingType'),
            coolingBrand: get('coolingBrand'),
            fanPreference: get('fanPreference'),
            caseIntakeFans: get('caseIntakeFans'),
            caseExhaustFans: get('caseExhaustFans'),
            fanBrand: get('fanBrand'),
            rgbFans: bool('rgbFans'),
            storagePreference: get('storagePreference'),
            ssdCapacity: get('ssdCapacity'),
            additionalStorage: get('additionalStorage'),
            additionalCapacity: get('additionalCapacity'),
            psuWattage: get('psuWattage'),
            psuBrand: get('psuBrand'),
            psuModular: bool('psuModular'),
            notes: get('notes'),
        };
    }
});

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function label(field, value) {
    if (!value) return '-';
    return LABELS[field]?.[value] || value;
}

function text(value, fallback = '-') {
    const v = (value ?? '').toString().trim();
    return v ? escapeHTML(v) : fallback;
}

function yesNo(value) {
    return value ? 'Yes' : 'No';
}

function plainText(value, fallback = '-') {
    const v = (value ?? '').toString().trim();
    return v || fallback;
}

function preferenceSections(c) {
    return [
        {
            title: 'Overview',
            rows: [
                ['Purpose', label('purpose', c.purpose)],
                ['Purpose details', plainText(c.setupPurpose)],
                ['Budget', c.budget ? `${c.budget} CHF` : '-'],
                ['Configuration style', label('colorScheme', c.colorScheme)],
                ['RGB preference', label('rgbPreference', c.rgbPreference)],
            ],
        },
        {
            title: 'Case & look',
            rows: [
                ['Case preference', label('casePreference', c.casePreference)],
                ['Case', plainText(c.case)],
                ['RGB Strimer cables', yesNo(c.strimerCables)],
            ],
        },
        {
            title: 'Motherboard',
            rows: [
                ['Preference', label('motherboardPreference', c.motherboardPreference)],
                ['Model', plainText(c.motherboardModel)],
                ['USB ports needed', label('usbPortsNeeded', c.usbPortsNeeded)],
                ['WiFi', yesNo(c.wifiEnabled)],
                ['10 Gigabit Ethernet', yesNo(c.ethernet10gb)],
                ['Strong CPU power delivery', yesNo(c.overclockVRM)],
            ],
        },
        {
            title: 'Processor',
            rows: [
                ['Preference', label('cpuPreference', c.cpuPreference)],
                ['Brand', label('cpuBrand', c.cpuBrand)],
                ['Model', plainText(c.cpuModel)],
            ],
        },
        {
            title: 'Memory',
            rows: [
                ['Preference', label('ramPreference', c.ramPreference)],
                ['Capacity', label('ramCapacity', c.ramCapacity)],
                ['Speed', label('ramSpeed', c.ramSpeed)],
                ['Brand', plainText(c.ramBrand)],
            ],
        },
        {
            title: 'Graphics',
            rows: [
                ['Preference', label('gpuPreference', c.gpuPreference)],
                ['Brand', label('gpuBrand', c.gpuBrand)],
                ['VRAM', label('vram', c.vram)],
                ['Model', plainText(c.gpuModel)],
            ],
        },
        {
            title: 'CPU cooling',
            rows: [
                ['Preference', label('coolingPreference', c.coolingPreference)],
                ['Type', label('coolingType', c.coolingType)],
                ['Model', plainText(c.coolingBrand)],
            ],
        },
        {
            title: 'Case fans',
            rows: [
                ['Preference', label('fanPreference', c.fanPreference)],
                ['Intake', label('caseIntakeFans', c.caseIntakeFans)],
                ['Exhaust', label('caseExhaustFans', c.caseExhaustFans)],
                ['Model', plainText(c.fanBrand)],
                ['RGB fans', yesNo(c.rgbFans)],
            ],
        },
        {
            title: 'Storage',
            rows: [
                ['Preference', label('storagePreference', c.storagePreference)],
                ['Primary SSD', label('ssdCapacity', c.ssdCapacity)],
                ['Additional', label('additionalStorage', c.additionalStorage)],
                ...(c.additionalStorage && c.additionalStorage !== 'none'
                    ? [['Additional capacity', plainText(c.additionalCapacity)]]
                    : []),
            ],
        },
        {
            title: 'Power supply',
            rows: [
                ['Wattage', label('psuWattage', c.psuWattage)],
                ['Brand', plainText(c.psuBrand)],
                ['Fully modular', yesNo(c.psuModular)],
            ],
        },
    ];
}

function savePreferencePDF(c, PDFConstructor) {
    const doc = new PDFConstructor({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 14;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    const addPageIfNeeded = (height = 8) => {
        if (y + height <= pageHeight - margin) return;
        doc.addPage();
        y = margin;
    };

    const writeLine = (textValue, x, options = {}) => {
        const size = options.size || 10;
        const style = options.style || 'normal';
        const color = options.color || [10, 10, 10];
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
        doc.setTextColor(...color);
        doc.text(String(textValue), x, y);
    };

    doc.setProperties({ title: 'PC Build Configuration' });
    writeLine('PC Build Configuration', margin, { size: 18, style: 'bold' });
    y += 7;
    writeLine(`Generated ${new Date().toLocaleDateString('en-GB')}`, margin, { size: 9, color: [107, 107, 107] });
    y += 8;
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    preferenceSections(c).forEach((section) => {
        addPageIfNeeded(18);
        writeLine(section.title.toUpperCase(), margin, { size: 9, style: 'bold', color: [130, 130, 130] });
        y += 4;
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, y, pageWidth - margin, y);
        y += 5;

        section.rows.forEach(([key, value]) => {
            const wrappedValue = doc.splitTextToSize(String(value), contentWidth - 58);
            const rowHeight = Math.max(6, wrappedValue.length * 5);
            addPageIfNeeded(rowHeight);
            writeLine(key, margin, { size: 9, color: [107, 107, 107] });
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(10, 10, 10);
            doc.text(wrappedValue, margin + 58, y);
            y += rowHeight;
        });

        y += 5;
    });

    if (c.notes) {
        addPageIfNeeded(18);
        writeLine('NOTES', margin, { size: 9, style: 'bold', color: [130, 130, 130] });
        y += 6;
        const noteLines = doc.splitTextToSize(c.notes, contentWidth);
        noteLines.forEach((line) => {
            addPageIfNeeded(5);
            writeLine(line, margin, { size: 9 });
            y += 5;
        });
    }

    doc.save(`pc-build-${new Date().toISOString().slice(0, 10)}.pdf`);
}

