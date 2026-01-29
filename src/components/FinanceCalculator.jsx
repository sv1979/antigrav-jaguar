import { useState, useEffect } from 'react';
import '../styles/finance-calculator.scss';
import carData from '../data/cars.json';

const FinanceCalculator = () => {
    // State
    const [selectedModelId, setSelectedModelId] = useState(carData[0].id);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    // Derived Model Data
    const currentModel = carData.find(c => c.id === selectedModelId) || carData[0];
    const currentVariant = currentModel.variants[selectedVariantIndex] || currentModel.variants[0];
    const price = currentVariant.price;

    const [deposit, setDeposit] = useState(0);
    const [term, setTerm] = useState(48);
    const [product, setProduct] = useState('freedom');
    const [frequency, setFrequency] = useState('monthly');
    const [km, setKm] = useState('0-15000');

    // Constant Logic
    const rate = 10.45;
    const establishmentFee = 287.39;
    // Mock Balloon payment logic (usually % of price, simplified here)
    const balloon = Math.round(price * 0.35);
    const estTotalInterest = Math.round((price - deposit) * (rate / 100) * (term / 12) * 0.6); // Simplified Interest calc
    const totalPayable = price + estTotalInterest + establishmentFee;

    const calculatePayment = () => {
        let monthlyPayment = (totalPayable - deposit - balloon) / term;
        // Adjust for interest curve roughly
        monthlyPayment = monthlyPayment * 1.1;

        if (frequency === 'monthly') return monthlyPayment;
        if (frequency === 'fortnightly') return monthlyPayment * 12 / 26;
        if (frequency === 'weekly') return monthlyPayment * 12 / 52;

        return 0;
    };

    const payment = calculatePayment().toFixed(2);

    // Reset variant when model changes
    const handleModelChange = (e) => {
        setSelectedModelId(e.target.value);
        setSelectedVariantIndex(0);
    };


    // Image Handling
    const [imageError, setImageError] = useState(false);

    // Reset image error when model changes
    useEffect(() => {
        setImageError(false);
    }, [selectedModelId]);

    const getImageUrl = () => {
        // e-pace -> epace
        const cleanId = selectedModelId.replace(/-/g, '');
        return new URL(`../assets/images/jaguar-${cleanId}.jpg`, import.meta.url).href;
    };

    return (
        <section className="finance-calculator container">
            <h2>Finance Calculator</h2>

            <div className="calc-container">
                {/* Left Column - Inputs */}
                <div className="inputs-section">
                    <div className="form-group">
                        <label htmlFor="model-select">Model:</label>
                        <select id="model-select" className="input-control" value={selectedModelId} onChange={handleModelChange}>
                            {carData.map(car => (
                                <option key={car.id} value={car.id}>{car.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sub-model-select">Sub-Model:</label>
                        <select
                            id="sub-model-select"
                            className="input-control"
                            value={selectedVariantIndex}
                            onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                        >
                            {currentModel.variants.map((variant, index) => (
                                <option key={index} value={index}>
                                    {variant.name} - ${variant.price.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label id="product-label">Finance Product:</label>
                        <div className="toggle-group" role="group" aria-labelledby="product-label">
                            <button
                                type="button"
                                className={product === 'freedom' ? 'active' : ''}
                                onClick={() => setProduct('freedom')}
                                aria-pressed={product === 'freedom'}
                            >
                                Jaguar Freedom
                            </button>
                            <button
                                type="button"
                                className={product === 'consumer' ? 'active' : ''}
                                onClick={() => setProduct('consumer')}
                                aria-pressed={product === 'consumer'}
                            >
                                Consumer Loan
                            </button>
                            <button
                                type="button"
                                className={product === 'business' ? 'active' : ''}
                                onClick={() => setProduct('business')}
                                aria-pressed={product === 'business'}
                            >
                                Business Loan
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="deposit-input">Deposit:</label>
                        <input
                            id="deposit-input"
                            type="text"
                            inputMode="numeric"
                            className="input-control"
                            value={deposit === 0 ? '$ ' : `$ ${deposit}`}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, '');
                                setDeposit(Number(val));
                            }}
                            placeholder="$"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="term-select">Loan Term:</label>
                        <select id="term-select" className="input-control" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
                            <option value={24}>24 months</option>
                            <option value={36}>36 months</option>
                            <option value={48}>48 months</option>
                            <option value={60}>60 months</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label id="freq-label">Repayment Frequency:</label>
                        <div className="toggle-group" role="group" aria-labelledby="freq-label">
                            <button type="button" aria-pressed={frequency === 'monthly'} className={frequency === 'monthly' ? 'active' : ''} onClick={() => setFrequency('monthly')}>Monthly</button>
                            <button type="button" aria-pressed={frequency === 'fortnightly'} className={frequency === 'fortnightly' ? 'active' : ''} onClick={() => setFrequency('fortnightly')}>Fortnightly</button>
                            <button type="button" aria-pressed={frequency === 'weekly'} className={frequency === 'weekly' ? 'active' : ''} onClick={() => setFrequency('weekly')}>Weekly</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="km-select">Expected Annual KM:</label>
                        <select id="km-select" className="input-control" value={km} onChange={(e) => setKm(e.target.value)}>
                            <option value="0-15000">0 - 15,000</option>
                            <option value="15000-20000">15,000 - 20,000</option>
                            <option value="20000+">20,000 +</option>
                        </select>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '20px' }}>
                        <strong>Estimated Interest Rate: {rate}% p.a.</strong>
                        <p>Our interest rates vary between 6.45% and 11.45% depending on your personal circumstances.</p>
                    </div>
                </div>

                {/* Right Column - Quote */}
                <div className="quote-section">
                    <div className="model-title">
                        <h3>JAGUAR {currentModel.name}</h3>
                        <div className="sub-title">{currentVariant.name}</div>
                    </div>

                    {/* Car Image Display */}
                    <div className="car-image-container" style={{ margin: '20px 0', textAlign: 'center', minHeight: '150px' }}>
                        {!imageError ? (
                            <img
                                src={getImageUrl()}
                                alt={currentModel.name}
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '150px',
                                backgroundColor: '#e0e0e0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                letterSpacing: '1px'
                            }}>
                                Image Not Available
                            </div>
                        )}
                    </div>

                    <div className="payment-display">
                        <span className="amount">${payment}</span>
                        <span className="frequency"> / {frequency}</span>
                        <span className="label">Estimated Repayment</span>
                    </div>

                    <div className="breakdown-table">
                        <div className="row">
                            <span>Vehicle price</span>
                            <span>${price.toLocaleString()}.00</span>
                        </div>
                        <div className="row">
                            <span>Jaguar Freedom</span>
                            <span>${balloon.toLocaleString()}.00</span>
                        </div>
                        <div className="row">
                            <span>Total Interest</span>
                            <span>${estTotalInterest.toLocaleString()}</span>
                        </div>
                        <div className="row">
                            <span>Establishment fees</span>
                            <span>${establishmentFee}</span>
                        </div>
                        <div className="row total">
                            <span>Total cost</span>
                            <span>${totalPayable.toLocaleString()}</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '20px' }}>
                        Note: the picture may not depict the sub-model you've chosen
                    </p>

                    <div className="form-group">
                        <label htmlFor="dealer-select">Select a dealer:</label>
                        <select id="dealer-select" className="input-control">
                            <option>Please select</option>
                        </select>
                    </div>

                    <button className="enquire-btn">Enquire</button>
                </div>
            </div>
        </section>
    );
};

export default FinanceCalculator;
