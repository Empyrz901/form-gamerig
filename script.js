document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rigConfigForm');
    const rgbPreferenceSelect = document.getElementById('rgbPreference');
    const strimerOption = document.getElementById('strimerOption');
    const additionalStorageSelect = document.getElementById('additionalStorage');
    const additionalStorageDetails = document.getElementById('additionalStorageDetails');

    // Load preset gaming configuration
    window.loadPresetGaming = function() {
        document.getElementById('case').value = 'NZXT H7 Flow (~100 CHF)';
        document.getElementById('budget').value = '1440';
        document.getElementById('purpose').value = 'gaming';
        document.getElementById('colorScheme').value = 'black';
        document.getElementById('rgbPreference').value = 'minimal';
        document.getElementById('wifiEnabled').checked = true;
        document.getElementById('ethernet10gb').checked = false;
        document.getElementById('overclockVRM').checked = true;
        document.getElementById('motherboardModel').value = 'ASUS ROG STRIX B650E-E WIFI (160 CHF)';
        document.getElementById('cpuBrand').value = 'amd';
        document.getElementById('cpuModel').value = 'AMD Ryzen 7 7800X3D (250 CHF)';
        document.getElementById('ramCapacity').value = '32gb';
        document.getElementById('ramSpeed').value = '6000';
        document.getElementById('ramBrand').value = 'Corsair, G.Skill (350 CHF)';
        document.getElementById('gpuBrand').value = 'amd';
        document.getElementById('vram').value = '16gb';
        document.getElementById('gpuModel').value = 'AMD Radeon RX 9060 XT 16GB (370 CHF)';
        document.getElementById('coolingType').value = 'aio240';
        document.getElementById('coolingBrand').value = 'Budget AIO';
        document.getElementById('ssdCapacity').value = '1tb';
        document.getElementById('additionalStorage').value = 'none';
        document.getElementById('psuWattage').value = '850w';
        document.getElementById('psuBrand').value = 'NZXT C850W ATX 3.1 (110 CHF)';
        document.getElementById('psuModular').checked = true;
        document.getElementById('notes').value = 'Gaming-focused setup with excellent CPU (7800X3D) and modern GPU (RX 9060 XT). Good balance of performance and price. Total: ~1440 CHF';
        
        // Trigger change events to update conditional fields
        strimerOption.classList.add('hidden');
        additionalStorageDetails.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset form to empty state
    window.resetForm = function() {
        form.reset();
        strimerOption.classList.add('hidden');
        additionalStorageDetails.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show/hide RGB Strimer option based on RGB preference
    rgbPreferenceSelect.addEventListener('change', function() {
        if (this.value === 'full' || this.value === 'moderate') {
            strimerOption.classList.remove('hidden');
        } else {
            strimerOption.classList.add('hidden');
            document.getElementById('strimerCables').checked = false;
        }
    });

    // Show/hide additional storage capacity field
    additionalStorageSelect.addEventListener('change', function() {
        if (this.value !== 'none' && this.value !== '') {
            additionalStorageDetails.classList.remove('hidden');
        } else {
            additionalStorageDetails.classList.add('hidden');
        }
    });

    // Handle form submission (PDF generation)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePDF();
    });

    function generatePDF() {
        const formData = new FormData(form);
        const config = {
            case: formData.get('case'),
            budget: formData.get('budget'),
            purpose: formData.get('purpose'),
            colorScheme: formData.get('colorScheme'),
            rgbPreference: formData.get('rgbPreference'),
            strimerCables: formData.get('strimerCables') ? 'Yes' : 'No',
            wifiEnabled: formData.get('wifiEnabled') ? 'Yes' : 'No',
            ethernet10gb: formData.get('ethernet10gb') ? 'Yes' : 'No',
            overclockVRM: formData.get('overclockVRM') ? 'Yes' : 'No',
            motherboardModel: formData.get('motherboardModel') || 'Not specified',
            cpuBrand: formData.get('cpuBrand'),
            cpuModel: formData.get('cpuModel') || 'Not specified',
            ramCapacity: formData.get('ramCapacity'),
            ramSpeed: formData.get('ramSpeed'),
            ramBrand: formData.get('ramBrand') || 'Not specified',
            gpuBrand: formData.get('gpuBrand'),
            vram: formData.get('vram'),
            gpuModel: formData.get('gpuModel') || 'Not specified',
            coolingType: formData.get('coolingType'),
            coolingBrand: formData.get('coolingBrand') || 'Not specified',
            ssdCapacity: formData.get('ssdCapacity'),
            additionalStorage: formData.get('additionalStorage'),
            additionalCapacity: formData.get('additionalCapacity') || 'Not specified',
            psuWattage: formData.get('psuWattage'),
            psuBrand: formData.get('psuBrand') || 'Not specified',
            psuModular: formData.get('psuModular') ? 'Yes (Fully Modular)' : 'Standard',
            notes: formData.get('notes') || 'No additional notes'
        };

        const htmlContent = generateHTMLContent(config);
        
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
        document.body.appendChild(element);

        const options = {
            margin: 10,
            filename: 'gaming-pc-config.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        html2pdf().set(options).from(element).save().then(() => {
            document.body.removeChild(element);
        });
    }

    function generateHTMLContent(config) {
        const purposeLabel = {
            'gaming': 'Gaming',
            'gaming-streaming': 'Gaming + Streaming',
            'gaming-content': 'Gaming + Content Creation',
            'general': 'General Use'
        };

        const colorLabel = {
            'white': 'White',
            'black': 'Black',
            'mixed': 'Black & White',
            'other': 'Other'
        };

        const rgbLabel = {
            'no': 'No RGB',
            'minimal': 'Minimal RGB',
            'moderate': 'Moderate RGB',
            'full': 'Full RGB (Fans & AIO)'
        };

        const coolingLabel = {
            'aio240': 'AIO Liquid (240mm)',
            'aio280': 'AIO Liquid (280mm)',
            'aio360': 'AIO Liquid (360mm)',
            'air': 'Air Cooler (High-end)'
        };

        const storageLabel = {
            'none': 'None',
            'ssd-additional': 'Additional SSD',
            'hdd-eco': 'HDD (Archival)',
            'ssd-hdd': 'SSD + HDD'
        };

        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #667eea; text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 10px;">
                    🖥️ Gaming PC Configuration
                </h1>
                <p style="text-align: center; color: #666; margin-bottom: 30px;">
                    Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">System Overview</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Budget:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">$${config.budget}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Purpose:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${purposeLabel[config.purpose]}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Case:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.case}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Color Scheme:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${colorLabel[config.colorScheme]}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Aesthetics & RGB</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>RGB Lighting:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${rgbLabel[config.rgbPreference]}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>RGB Strimer Cables:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.strimerCables}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Motherboard</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Model:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.motherboardModel}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>WiFi:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.wifiEnabled}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>10GB Ethernet:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.ethernet10gb}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Overclocking Support (High VRM):</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.overclockVRM}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Processor (CPU)</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Brand Preference:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.cpuBrand}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Specific Model:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.cpuModel}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Memory (RAM)</h2>
                    <p style="color: #666; font-style: italic; margin-bottom: 10px;">Recommended minimum: 6000MHz for DDR5</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Capacity:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.ramCapacity}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Speed:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.ramSpeed}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Brand Preference:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.ramBrand}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Graphics Card (GPU)</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Brand Preference:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.gpuBrand}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>VRAM Capacity:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.vram}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Specific Model:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.gpuModel}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Cooling Solution</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Type:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${coolingLabel[config.coolingType]}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Brand Preference:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.coolingBrand}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Storage</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Primary SSD:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.ssdCapacity}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Additional Storage:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${storageLabel[config.additionalStorage]}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Capacity:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.additionalCapacity}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Power Supply (PSU)</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd; width: 40%;"><strong>Wattage:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.psuWattage}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Brand Preference:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.psuBrand}</td>
                        </tr>
                        <tr style="background: #fafafa;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Type:</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${config.psuModular}</td>
                        </tr>
                    </table>
                </section>

                <section style="margin-bottom: 25px;">
                    <h2 style="background: #f0f0f0; padding: 10px; border-left: 4px solid #667eea;">Additional Notes</h2>
                    <p style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${config.notes}</p>
                </section>

                <section style="background: #d1ecf1; border-left: 4px solid #17a2b8; padding: 15px; border-radius: 4px;">
                    <strong style="color: #0c5460;">📋 Cable Management Note:</strong>
                    <p style="color: #0c5460; margin-top: 5px;">Your build will have presentable cable management with good organization and routing, though not at the level of a premium showcase or competitive modding setup.</p>
                </section>

                <footer style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; color: #999; font-size: 0.9em;">
                    <p>Gaming PC Configuration Builder | ${new Date().getFullYear()}</p>
                </footer>
            </div>
        `;

        return html;
    }
});
