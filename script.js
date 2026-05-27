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
        'specific': 'Specific model',
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
        'specific': 'Specific model',
    },
    ramPreference: {
        'no-preference': 'No preference',
        'specific': 'Specific capacity',
    },
    coolingPreference: {
        'no-preference': 'No preference / best fit',
        'air': 'Ventirad / air cooler',
        'aio': 'AIO liquid cooler',
        'specific': 'Specific cooler model',
    },
    coolingType: {
        'air-budget': 'Air — budget',
        'air-mid': 'Air — mid-range',
        'air-high': 'Air — high-end',
        'aio240': 'AIO 240mm',
        'aio280': 'AIO 280mm',
        'aio360': 'AIO 360mm',
    },
    ramCapacity: {
        '32gb': '32GB (2×16)',
        '48gb': '48GB (2×24)',
        '64gb': '64GB (2×32)',
        '96gb': '96GB (2×48)',
    },
    ramSpeed: {
        '5600': 'DDR5-5600',
        '6000': 'DDR5-6000',
        '6400': 'DDR5-6400',
        '6800': 'DDR5-6800+',
    },
    vram: {
        '12gb': '12GB',
        '16gb': '16GB',
        '24gb': '24GB',
        '32gb': '32GB+',
    },
    caseIntakeFans: {
        'stock': 'Stock',
        '1x120': '+1× 120mm',
        '2x120': '+2× 120mm',
        '3x120': '+3× 120mm (full front)',
        '2x140': '+2× 140mm',
    },
    caseExhaustFans: {
        'stock': 'Stock',
        '1x120': '1× 120mm (rear)',
        '1x140': '1× 140mm (rear)',
        '2x120': '2× 120mm (top)',
        '1x120-1x140': '1× 120mm rear + 1× 140mm top',
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
};

// CPU TDP / PL2 (W). Used to bump PSU recommendation for power-hungry chips.
const CPU_TDP_W = {
    // Intel Core Ultra (LGA1851) — total package power approx
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
    'b650e-e': 'atx',
};

function normalizeFormFactorText(value) {
    return (value || '')
        .toLowerCase()
        .replace(/[×x]/g, 'x')
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
    if (/(?:^|\b)(?:micro\s*-?\s*atx|m\s*-?\s*atx|matx|u\s*-?\s*atx|uatx|µ\s*-?\s*atx)(?:\b|$)/i.test(text)) return 'matx';
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
    budget: '1900',
    purpose: 'gaming',
    colorScheme: 'standard',
    rgbPreference: 'minimal',
    motherboardPreference: 'specific',
    wifiEnabled: true,
    overclockVRM: true,
    motherboardModel: 'ASUS ROG STRIX B650E-E WiFi (~287 CHF)',
    cpuPreference: 'specific',
    cpuBrand: 'amd',
    cpuModel: 'AMD Ryzen 7 7800X3D (~447 CHF)',
    ramPreference: 'specific',
    ramCapacity: '32gb',
    ramSpeed: '6000',
    ramBrand: 'G.Skill / Corsair, 32GB DDR5-6000 (~330 CHF)',
    gpuPreference: 'specific',
    gpuBrand: 'amd',
    vram: '16gb',
    gpuModel: 'AMD Radeon RX 9060 XT 16GB (~420 CHF, varies by AIB)',
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
    psuBrand: 'NZXT C850 Gold ATX 3.1 (~130 CHF)',
    psuModular: true,
    notes: 'Gaming-focused build around the 7800X3D and RX 9060 XT. Budget air cooler (Peerless Assassin 120 SE) handles the 7800X3D quietly. Approx. total: ~1,890 CHF on digitec (case 133 + board 287 + CPU 447 + RAM 330 + GPU 420 + cooler 60 + SSD 62 + PSU 130 + 3× fans 22).',
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rigConfigForm');
    const rgbSelect = document.getElementById('rgbPreference');
    const strimerOption = document.getElementById('strimerOption');
    const rgbFanOption = document.getElementById('rgbFanOption');
    const preferenceControls = Array.from(document.querySelectorAll('[data-preference-control]'));

    window.loadPresetGaming = () => {
        form.reset();
        applyPreset(GAMING_PRESET);
        updateConditionalFields();
        updatePSUWarning();
        updateMotherboardCompatibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    async function generatePDF() {
        if (typeof html2pdf === 'undefined') {
            alert('PDF library failed to load. Check your internet connection and refresh.');
            return;
        }

        const config = collectConfig();
        const wrapper = document.createElement('div');
        wrapper.style.cssText = [
            'position: fixed',
            'left: 0',
            'top: 0',
            'width: 794px',
            'background: #ffffff',
            'pointer-events: none',
            'z-index: 2147483647',
        ].join('; ');
        wrapper.innerHTML = renderPreferencePDF(config);
        document.body.appendChild(wrapper);

        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const cleanup = () => {
            if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
        };

        html2pdf()
            .set({
                margin: 10,
                filename: `pc-build-${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 794,
                    windowHeight: wrapper.scrollHeight,
                },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
            })
            .from(wrapper)
            .save()
            .then(cleanup)
            .catch((err) => {
                cleanup();
                console.error('PDF generation failed:', err);
                alert('PDF generation failed: ' + (err && err.message ? err.message : err));
            });
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
            colorScheme: get('colorScheme'),
            rgbPreference: get('rgbPreference'),
            strimerCables: bool('strimerCables'),
            motherboardPreference: get('motherboardPreference'),
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
    if (!value) return '—';
    return LABELS[field]?.[value] || value;
}

function text(value, fallback = '—') {
    const v = (value ?? '').toString().trim();
    return v ? escapeHTML(v) : fallback;
}

function yesNo(value) {
    return value ? 'Yes' : 'No';
}

function renderPDF(c) {
    const date = new Date().toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const sections = [
        {
            title: 'Overview',
            rows: [
                ['Purpose', label('purpose', c.purpose)],
                ['Budget', c.budget ? `${escapeHTML(c.budget)} CHF` : '—'],
                ['Case', text(c.case)],
                ['Color scheme', label('colorScheme', c.colorScheme)],
                ['RGB lighting', label('rgbPreference', c.rgbPreference)],
                ['RGB Strimer cables', yesNo(c.strimerCables)],
            ],
        },
        {
            title: 'Motherboard',
            rows: [
                ['Model', text(c.motherboardModel)],
                ['WiFi', yesNo(c.wifiEnabled)],
                ['10GbE', yesNo(c.ethernet10gb)],
                ['Overclocking-grade VRM', yesNo(c.overclockVRM)],
            ],
        },
        {
            title: 'Processor',
            rows: [
                ['Brand', label('cpuBrand', c.cpuBrand)],
                ['Model', text(c.cpuModel)],
            ],
        },
        {
            title: 'Memory',
            rows: [
                ['Capacity', label('ramCapacity', c.ramCapacity)],
                ['Speed', label('ramSpeed', c.ramSpeed)],
                ['Brand', text(c.ramBrand)],
            ],
        },
        {
            title: 'Graphics',
            rows: [
                ['Brand', label('gpuBrand', c.gpuBrand)],
                ['VRAM', label('vram', c.vram)],
                ['Model', text(c.gpuModel)],
            ],
        },
        {
            title: 'CPU cooling',
            rows: [
                ['Type', label('coolingType', c.coolingType)],
                ['Model', text(c.coolingBrand)],
            ],
        },
        {
            title: 'Case fans',
            rows: [
                ['Intake', label('caseIntakeFans', c.caseIntakeFans)],
                ['Exhaust', label('caseExhaustFans', c.caseExhaustFans)],
                ['Model', text(c.fanBrand)],
                ['RGB fans', yesNo(c.rgbFans)],
            ],
        },
        {
            title: 'Storage',
            rows: [
                ['Primary SSD', label('ssdCapacity', c.ssdCapacity)],
                ['Additional', label('additionalStorage', c.additionalStorage)],
                ...(c.additionalStorage && c.additionalStorage !== 'none'
                    ? [['Additional capacity', text(c.additionalCapacity)]]
                    : []),
            ],
        },
        {
            title: 'Power supply',
            rows: [
                ['Wattage', label('psuWattage', c.psuWattage)],
                ['Brand', text(c.psuBrand)],
                ['Fully modular', yesNo(c.psuModular)],
            ],
        },
    ];

    const sectionsHTML = sections.map(renderSection).join('');
    const notesHTML = c.notes
        ? `
            <div style="margin-bottom: 20px; page-break-inside: avoid;">
                <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a9a; margin: 0 0 10px 0; padding-bottom: 6px; border-bottom: 1px solid #e6e6e6;">Notes</div>
                <div style="padding: 12px 14px; background: #fafafa; border: 1px solid #e6e6e6; border-radius: 6px; white-space: pre-wrap; font-size: 11px; color: #0a0a0a;">${escapeHTML(c.notes)}</div>
            </div>
        `
        : '';

    return `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a; padding: 24px 28px; font-size: 11px; line-height: 1.5; background: #ffffff; box-sizing: border-box;">
            <div style="border-bottom: 1px solid #e6e6e6; padding-bottom: 16px; margin-bottom: 24px;">
                <div style="font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 4px 0; color: #0a0a0a;">PC Build Configuration</div>
                <div style="font-size: 11px; color: #6b6b6b; margin: 0;">Generated ${escapeHTML(date)}</div>
            </div>

            ${sectionsHTML}
            ${notesHTML}

            <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e6e6e6; font-size: 10px; color: #9a9a9a; text-align: center;">Cable management: presentable routing, clean and organized — not a premium showcase build.</div>
        </div>
    `;
}

function renderPreferencePDF(c) {
    const date = new Date().toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const sections = [
        {
            title: 'Overview',
            rows: [
                ['Purpose', label('purpose', c.purpose)],
                ['Budget', c.budget ? `${escapeHTML(c.budget)} CHF` : '—'],
                ['Configuration style', label('colorScheme', c.colorScheme)],
                ['RGB preference', label('rgbPreference', c.rgbPreference)],
            ],
        },
        {
            title: 'Case & look',
            rows: [
                ['Case preference', label('casePreference', c.casePreference)],
                ['Case', text(c.case)],
                ['RGB Strimer cables', yesNo(c.strimerCables)],
            ],
        },
        {
            title: 'Motherboard',
            rows: [
                ['Preference', label('motherboardPreference', c.motherboardPreference)],
                ['Model', text(c.motherboardModel)],
                ['WiFi', yesNo(c.wifiEnabled)],
                ['10GbE', yesNo(c.ethernet10gb)],
                ['Overclocking-grade VRM', yesNo(c.overclockVRM)],
            ],
        },
        {
            title: 'Processor',
            rows: [
                ['Preference', label('cpuPreference', c.cpuPreference)],
                ['Brand', label('cpuBrand', c.cpuBrand)],
                ['Model', text(c.cpuModel)],
            ],
        },
        {
            title: 'Memory',
            rows: [
                ['Preference', label('ramPreference', c.ramPreference)],
                ['Capacity', label('ramCapacity', c.ramCapacity)],
                ['Speed', label('ramSpeed', c.ramSpeed)],
                ['Brand', text(c.ramBrand)],
            ],
        },
        {
            title: 'Graphics',
            rows: [
                ['Preference', label('gpuPreference', c.gpuPreference)],
                ['Brand', label('gpuBrand', c.gpuBrand)],
                ['VRAM', label('vram', c.vram)],
                ['Model', text(c.gpuModel)],
            ],
        },
        {
            title: 'CPU cooling',
            rows: [
                ['Preference', label('coolingPreference', c.coolingPreference)],
                ['Type', label('coolingType', c.coolingType)],
                ['Model', text(c.coolingBrand)],
            ],
        },
        {
            title: 'Case fans',
            rows: [
                ['Preference', label('fanPreference', c.fanPreference)],
                ['Intake', label('caseIntakeFans', c.caseIntakeFans)],
                ['Exhaust', label('caseExhaustFans', c.caseExhaustFans)],
                ['Model', text(c.fanBrand)],
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
                    ? [['Additional capacity', text(c.additionalCapacity)]]
                    : []),
            ],
        },
        {
            title: 'Power supply',
            rows: [
                ['Wattage', label('psuWattage', c.psuWattage)],
                ['Brand', text(c.psuBrand)],
                ['Fully modular', yesNo(c.psuModular)],
            ],
        },
    ];

    const sectionsHTML = sections.map(renderSection).join('');
    const notesHTML = c.notes
        ? `
            <div style="margin-bottom: 20px; page-break-inside: avoid;">
                <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a9a; margin: 0 0 10px 0; padding-bottom: 6px; border-bottom: 1px solid #e6e6e6;">Notes</div>
                <div style="padding: 12px 14px; background: #fafafa; border: 1px solid #e6e6e6; border-radius: 6px; white-space: pre-wrap; font-size: 11px; color: #0a0a0a;">${escapeHTML(c.notes)}</div>
            </div>
        `
        : '';

    return `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a; padding: 24px 28px; font-size: 11px; line-height: 1.5; background: #ffffff; box-sizing: border-box;">
            <div style="border-bottom: 1px solid #e6e6e6; padding-bottom: 16px; margin-bottom: 24px;">
                <div style="font-size: 22px; font-weight: 600; margin: 0 0 4px 0; color: #0a0a0a;">PC Build Configuration</div>
                <div style="font-size: 11px; color: #6b6b6b; margin: 0;">Generated ${escapeHTML(date)}</div>
            </div>

            ${sectionsHTML}
            ${notesHTML}

            <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e6e6e6; font-size: 10px; color: #9a9a9a; text-align: center;">Cable management: presentable routing, clean and organized - not premium showcase level.</div>
        </div>
    `;
}

function renderSection({ title, rows }) {
    const items = rows
        .map(([k, v]) => `
            <tr>
                <td style="padding: 5px 0; color: #6b6b6b; font-size: 11px; width: 35%; vertical-align: top;">${escapeHTML(k)}</td>
                <td style="padding: 5px 0; color: #0a0a0a; font-size: 11px; font-weight: 500; vertical-align: top;">${v}</td>
            </tr>
        `)
        .join('');
    return `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a9a; margin: 0 0 10px 0; padding-bottom: 6px; border-bottom: 1px solid #e6e6e6;">${escapeHTML(title)}</div>
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>${items}</tbody>
            </table>
        </div>
    `;
}
