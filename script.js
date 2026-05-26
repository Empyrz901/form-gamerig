const LABELS = {
    purpose: {
        'gaming': 'Gaming',
        'gaming-streaming': 'Gaming + streaming',
        'gaming-content': 'Gaming + content creation',
        'general': 'General use',
    },
    colorScheme: {
        'white': 'White',
        'black': 'Black',
        'mixed': 'Black & white',
        'other': 'Other',
    },
    rgbPreference: {
        'no': 'None',
        'minimal': 'Minimal',
        'moderate': 'Moderate',
        'full': 'Full (fans & AIO)',
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

const GAMING_PRESET = {
    case: 'NZXT H7 Flow (~100 CHF)',
    budget: '1440',
    purpose: 'gaming',
    colorScheme: 'black',
    rgbPreference: 'minimal',
    wifiEnabled: true,
    overclockVRM: true,
    motherboardModel: 'ASUS ROG STRIX B650E-E WiFi (~160 CHF)',
    cpuBrand: 'amd',
    cpuModel: 'AMD Ryzen 7 7800X3D (~250 CHF)',
    ramCapacity: '32gb',
    ramSpeed: '6000',
    ramBrand: 'G.Skill / Corsair (~350 CHF)',
    gpuBrand: 'amd',
    vram: '16gb',
    gpuModel: 'AMD Radeon RX 9060 XT 16GB (~370 CHF)',
    coolingType: 'air-budget',
    coolingBrand: 'Thermalright Peerless Assassin 120 SE (~60 CHF)',
    caseIntakeFans: '2x120',
    caseExhaustFans: '1x120',
    fanBrand: 'Arctic P12 PWM (~12 CHF each)',
    ssdCapacity: '1tb',
    additionalStorage: 'none',
    psuWattage: '850w',
    psuBrand: 'NZXT C850W ATX 3.1 (~110 CHF)',
    psuModular: true,
    notes: 'Gaming-focused build around the 7800X3D and RX 9060 XT. Budget air cooler is sufficient and quiet. Approx. total: 1,440 CHF (excluding case fans).',
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rigConfigForm');
    const rgbSelect = document.getElementById('rgbPreference');
    const strimerOption = document.getElementById('strimerOption');
    const rgbFanOption = document.getElementById('rgbFanOption');
    const storageSelect = document.getElementById('additionalStorage');
    const storageDetails = document.getElementById('additionalStorageDetails');

    window.loadPresetGaming = () => {
        form.reset();
        applyPreset(GAMING_PRESET);
        updateConditionalFields();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetForm = () => {
        form.reset();
        updateConditionalFields();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    rgbSelect.addEventListener('change', updateConditionalFields);
    storageSelect.addEventListener('change', updateConditionalFields);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generatePDF();
    });

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

        const storage = storageSelect.value;
        toggle(storageDetails, storage && storage !== 'none');
    }

    function toggle(el, show) {
        el.classList.toggle('hidden', !show);
    }

    function generatePDF() {
        const config = collectConfig();
        const element = document.createElement('div');
        element.innerHTML = renderPDF(config);
        document.body.appendChild(element);

        html2pdf()
            .set({
                margin: [12, 12, 12, 12],
                filename: `pc-build-${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            })
            .from(element)
            .save()
            .then(() => document.body.removeChild(element));
    }

    function collectConfig() {
        const data = new FormData(form);
        const get = (k) => data.get(k) || '';
        const bool = (k) => data.get(k) === 'on' || data.get(k) === 'true';

        return {
            case: get('case'),
            budget: get('budget'),
            purpose: get('purpose'),
            colorScheme: get('colorScheme'),
            rgbPreference: get('rgbPreference'),
            strimerCables: bool('strimerCables'),
            wifiEnabled: bool('wifiEnabled'),
            ethernet10gb: bool('ethernet10gb'),
            overclockVRM: bool('overclockVRM'),
            motherboardModel: get('motherboardModel'),
            cpuBrand: get('cpuBrand'),
            cpuModel: get('cpuModel'),
            ramCapacity: get('ramCapacity'),
            ramSpeed: get('ramSpeed'),
            ramBrand: get('ramBrand'),
            gpuBrand: get('gpuBrand'),
            vram: get('vram'),
            gpuModel: get('gpuModel'),
            coolingType: get('coolingType'),
            coolingBrand: get('coolingBrand'),
            caseIntakeFans: get('caseIntakeFans'),
            caseExhaustFans: get('caseExhaustFans'),
            fanBrand: get('fanBrand'),
            rgbFans: bool('rgbFans'),
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
            <section class="block">
                <h2>Notes</h2>
                <p class="notes">${escapeHTML(c.notes)}</p>
            </section>
        `
        : '';

    return `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a; padding: 8mm; font-size: 11px; line-height: 1.5;">
            <style>
                .pdf-header { border-bottom: 1px solid #e6e6e6; padding-bottom: 16px; margin-bottom: 24px; }
                .pdf-title { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 4px; }
                .pdf-subtitle { font-size: 11px; color: #6b6b6b; margin: 0; }
                .block { margin-bottom: 20px; page-break-inside: avoid; }
                .block h2 { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a9a; margin: 0 0 10px; padding-bottom: 6px; border-bottom: 1px solid #e6e6e6; }
                .kv { display: grid; grid-template-columns: 160px 1fr; gap: 6px 16px; }
                .k { color: #6b6b6b; font-size: 11px; }
                .v { color: #0a0a0a; font-size: 11px; font-weight: 500; }
                .notes { padding: 12px 14px; background: #fafafa; border: 1px solid #e6e6e6; border-radius: 6px; white-space: pre-wrap; font-size: 11px; color: #0a0a0a; }
                .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e6e6e6; font-size: 10px; color: #9a9a9a; text-align: center; }
            </style>

            <div class="pdf-header">
                <h1 class="pdf-title">PC Build Configuration</h1>
                <p class="pdf-subtitle">Generated ${escapeHTML(date)}</p>
            </div>

            ${sectionsHTML}
            ${notesHTML}

            <div class="footer">Cable management: presentable routing, clean and organized — not a premium showcase build.</div>
        </div>
    `;
}

function renderSection({ title, rows }) {
    const items = rows
        .map(([k, v]) => `<div class="k">${escapeHTML(k)}</div><div class="v">${v}</div>`)
        .join('');
    return `
        <section class="block">
            <h2>${escapeHTML(title)}</h2>
            <div class="kv">${items}</div>
        </section>
    `;
}
