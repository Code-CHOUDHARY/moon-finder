// Indian cities: [slug, English name, Hindi name, state, lat, lng]. The first 60 also get festival × city pages.
// Coordinates are city centres (approximate, ~0.01°), enough for moonrise times to within about a minute.
'use strict';
const RAW = [
  ['delhi', 'Delhi', 'दिल्ली', 'Delhi', 28.6139, 77.2090],
  ['mumbai', 'Mumbai', 'मुंबई', 'Maharashtra', 19.0760, 72.8777],
  ['bengaluru', 'Bengaluru', 'बेंगलुरु', 'Karnataka', 12.9716, 77.5946],
  ['kolkata', 'Kolkata', 'कोलकाता', 'West Bengal', 22.5726, 88.3639],
  ['chennai', 'Chennai', 'चेन्नई', 'Tamil Nadu', 13.0827, 80.2707],
  ['hyderabad', 'Hyderabad', 'हैदराबाद', 'Telangana', 17.3850, 78.4867],
  ['ahmedabad', 'Ahmedabad', 'अहमदाबाद', 'Gujarat', 23.0225, 72.5714],
  ['pune', 'Pune', 'पुणे', 'Maharashtra', 18.5204, 73.8567],
  ['jaipur', 'Jaipur', 'जयपुर', 'Rajasthan', 26.9124, 75.7873],
  ['lucknow', 'Lucknow', 'लखनऊ', 'Uttar Pradesh', 26.8467, 80.9462],
  ['surat', 'Surat', 'सूरत', 'Gujarat', 21.1702, 72.8311],
  ['kanpur', 'Kanpur', 'कानपुर', 'Uttar Pradesh', 26.4499, 80.3319],
  ['nagpur', 'Nagpur', 'नागपुर', 'Maharashtra', 21.1458, 79.0882],
  ['indore', 'Indore', 'इंदौर', 'Madhya Pradesh', 22.7196, 75.8577],
  ['bhopal', 'Bhopal', 'भोपाल', 'Madhya Pradesh', 23.2599, 77.4126],
  ['patna', 'Patna', 'पटना', 'Bihar', 25.5941, 85.1376],
  ['vadodara', 'Vadodara', 'वडोदरा', 'Gujarat', 22.3072, 73.1812],
  ['ghaziabad', 'Ghaziabad', 'गाज़ियाबाद', 'Uttar Pradesh', 28.6692, 77.4538],
  ['ludhiana', 'Ludhiana', 'लुधियाना', 'Punjab', 30.9010, 75.8573],
  ['agra', 'Agra', 'आगरा', 'Uttar Pradesh', 27.1767, 78.0081],
  ['nashik', 'Nashik', 'नासिक', 'Maharashtra', 19.9975, 73.7898],
  ['faridabad', 'Faridabad', 'फ़रीदाबाद', 'Haryana', 28.4089, 77.3178],
  ['meerut', 'Meerut', 'मेरठ', 'Uttar Pradesh', 28.9845, 77.7064],
  ['rajkot', 'Rajkot', 'राजकोट', 'Gujarat', 22.3039, 70.8022],
  ['varanasi', 'Varanasi', 'वाराणसी', 'Uttar Pradesh', 25.3176, 82.9739],
  ['srinagar', 'Srinagar', 'श्रीनगर', 'Jammu and Kashmir', 34.0837, 74.7973],
  ['amritsar', 'Amritsar', 'अमृतसर', 'Punjab', 31.6340, 74.8723],
  ['prayagraj', 'Prayagraj', 'प्रयागराज', 'Uttar Pradesh', 25.4358, 81.8463],
  ['ranchi', 'Ranchi', 'रांची', 'Jharkhand', 23.3441, 85.3096],
  ['jodhpur', 'Jodhpur', 'जोधपुर', 'Rajasthan', 26.2389, 73.0243],
  ['raipur', 'Raipur', 'रायपुर', 'Chhattisgarh', 21.2514, 81.6296],
  ['gwalior', 'Gwalior', 'ग्वालियर', 'Madhya Pradesh', 26.2183, 78.1828],
  ['chandigarh', 'Chandigarh', 'चंडीगढ़', 'Chandigarh', 30.7333, 76.7794],
  ['guwahati', 'Guwahati', 'गुवाहाटी', 'Assam', 26.1445, 91.7362],
  ['kota', 'Kota', 'कोटा', 'Rajasthan', 25.2138, 75.8648],
  ['jabalpur', 'Jabalpur', 'जबलपुर', 'Madhya Pradesh', 23.1815, 79.9864],
  ['gurugram', 'Gurugram', 'गुरुग्राम', 'Haryana', 28.4595, 77.0266],
  ['noida', 'Noida', 'नोएडा', 'Uttar Pradesh', 28.5355, 77.3910],
  ['dehradun', 'Dehradun', 'देहरादून', 'Uttarakhand', 30.3165, 78.0322],
  ['bhubaneswar', 'Bhubaneswar', 'भुवनेश्वर', 'Odisha', 20.2961, 85.8245],
  ['visakhapatnam', 'Visakhapatnam', 'विशाखापत्तनम', 'Andhra Pradesh', 17.6868, 83.2185],
  ['coimbatore', 'Coimbatore', 'कोयंबटूर', 'Tamil Nadu', 11.0168, 76.9558],
  ['madurai', 'Madurai', 'मदुरै', 'Tamil Nadu', 9.9252, 78.1198],
  ['kochi', 'Kochi', 'कोच्चि', 'Kerala', 9.9312, 76.2673],
  ['thiruvananthapuram', 'Thiruvananthapuram', 'तिरुवनंतपुरम', 'Kerala', 8.5241, 76.9366],
  ['vijayawada', 'Vijayawada', 'विजयवाड़ा', 'Andhra Pradesh', 16.5062, 80.6480],
  ['aurangabad', 'Chhatrapati Sambhajinagar (Aurangabad)', 'छत्रपति संभाजीनगर (औरंगाबाद)', 'Maharashtra', 19.8762, 75.3433],
  ['udaipur', 'Udaipur', 'उदयपुर', 'Rajasthan', 24.5854, 73.7125],
  ['ajmer', 'Ajmer', 'अजमेर', 'Rajasthan', 26.4499, 74.6399],
  ['bikaner', 'Bikaner', 'बीकानेर', 'Rajasthan', 28.0229, 73.3119],
  ['bareilly', 'Bareilly', 'बरेली', 'Uttar Pradesh', 28.3670, 79.4304],
  ['aligarh', 'Aligarh', 'अलीगढ़', 'Uttar Pradesh', 27.8974, 78.0880],
  ['moradabad', 'Moradabad', 'मुरादाबाद', 'Uttar Pradesh', 28.8386, 78.7733],
  ['gorakhpur', 'Gorakhpur', 'गोरखपुर', 'Uttar Pradesh', 26.7606, 83.3732],
  ['jammu', 'Jammu', 'जम्मू', 'Jammu and Kashmir', 32.7266, 74.8570],
  ['shimla', 'Shimla', 'शिमला', 'Himachal Pradesh', 31.1048, 77.1734],
  ['haridwar', 'Haridwar', 'हरिद्वार', 'Uttarakhand', 29.9457, 78.1642],
  ['ujjain', 'Ujjain', 'उज्जैन', 'Madhya Pradesh', 23.1765, 75.7885],
  ['jalandhar', 'Jalandhar', 'जालंधर', 'Punjab', 31.3260, 75.5762],
  ['panipat', 'Panipat', 'पानीपत', 'Haryana', 29.3909, 76.9635],
  // Remaining cities: city pages only
  ['mysuru', 'Mysuru', 'मैसूरु', 'Karnataka', 12.2958, 76.6394],
  ['mangaluru', 'Mangaluru', 'मंगलुरु', 'Karnataka', 12.9141, 74.8560],
  ['hubballi', 'Hubballi', 'हुब्बल्ली', 'Karnataka', 15.3647, 75.1240],
  ['belagavi', 'Belagavi', 'बेलगावी', 'Karnataka', 15.8497, 74.4977],
  ['tiruchirappalli', 'Tiruchirappalli', 'तिरुचिरापल्ली', 'Tamil Nadu', 10.7905, 78.7047],
  ['salem', 'Salem', 'सेलम', 'Tamil Nadu', 11.6643, 78.1460],
  ['puducherry', 'Puducherry', 'पुदुचेरी', 'Puducherry', 11.9416, 79.8083],
  ['kozhikode', 'Kozhikode', 'कोझिकोड', 'Kerala', 11.2588, 75.7804],
  ['thrissur', 'Thrissur', 'त्रिशूर', 'Kerala', 10.5276, 76.2144],
  ['tirupati', 'Tirupati', 'तिरुपति', 'Andhra Pradesh', 13.6288, 79.4192],
  ['guntur', 'Guntur', 'गुंटूर', 'Andhra Pradesh', 16.3067, 80.4365],
  ['warangal', 'Warangal', 'वारंगल', 'Telangana', 17.9689, 79.5941],
  ['solapur', 'Solapur', 'सोलापुर', 'Maharashtra', 17.6599, 75.9064],
  ['kolhapur', 'Kolhapur', 'कोल्हापुर', 'Maharashtra', 16.7050, 74.2433],
  ['thane', 'Thane', 'ठाणे', 'Maharashtra', 19.2183, 72.9781],
  ['navi-mumbai', 'Navi Mumbai', 'नवी मुंबई', 'Maharashtra', 19.0330, 73.0297],
  ['amravati', 'Amravati', 'अमरावती', 'Maharashtra', 20.9374, 77.7796],
  ['panaji', 'Panaji', 'पणजी', 'Goa', 15.4909, 73.8278],
  ['bhavnagar', 'Bhavnagar', 'भावनगर', 'Gujarat', 21.7645, 72.1519],
  ['jamnagar', 'Jamnagar', 'जामनगर', 'Gujarat', 22.4707, 70.0577],
  ['gandhinagar', 'Gandhinagar', 'गांधीनगर', 'Gujarat', 23.2156, 72.6369],
  ['jhansi', 'Jhansi', 'झांसी', 'Uttar Pradesh', 25.4484, 78.5685],
  ['mathura', 'Mathura', 'मथुरा', 'Uttar Pradesh', 27.4924, 77.6737],
  ['ayodhya', 'Ayodhya', 'अयोध्या', 'Uttar Pradesh', 26.7922, 82.1998],
  ['saharanpur', 'Saharanpur', 'सहारनपुर', 'Uttar Pradesh', 29.9640, 77.5460],
  ['rohtak', 'Rohtak', 'रोहतक', 'Haryana', 28.8955, 76.6066],
  ['hisar', 'Hisar', 'हिसार', 'Haryana', 29.1492, 75.7217],
  ['patiala', 'Patiala', 'पटियाला', 'Punjab', 30.3398, 76.3869],
  ['bathinda', 'Bathinda', 'बठिंडा', 'Punjab', 30.2110, 74.9455],
  ['gaya', 'Gaya', 'गया', 'Bihar', 24.7914, 85.0002],
  ['bhagalpur', 'Bhagalpur', 'भागलपुर', 'Bihar', 25.2425, 86.9842],
  ['muzaffarpur', 'Muzaffarpur', 'मुज़फ़्फ़रपुर', 'Bihar', 26.1209, 85.3647],
  ['jamshedpur', 'Jamshedpur', 'जमशेदपुर', 'Jharkhand', 22.8046, 86.2029],
  ['dhanbad', 'Dhanbad', 'धनबाद', 'Jharkhand', 23.7957, 86.4304],
  ['cuttack', 'Cuttack', 'कटक', 'Odisha', 20.4625, 85.8830],
  ['siliguri', 'Siliguri', 'सिलीगुड़ी', 'West Bengal', 26.7271, 88.3953],
  ['durgapur', 'Durgapur', 'दुर्गापुर', 'West Bengal', 23.5204, 87.3119],
  ['bilaspur', 'Bilaspur', 'बिलासपुर', 'Chhattisgarh', 22.0797, 82.1409],
  ['imphal', 'Imphal', 'इंफाल', 'Manipur', 24.8170, 93.9368],
  ['shillong', 'Shillong', 'शिलांग', 'Meghalaya', 25.5788, 91.8933],
  ['agartala', 'Agartala', 'अगरतला', 'Tripura', 23.8315, 91.2868],
  ['port-blair', 'Sri Vijaya Puram (Port Blair)', 'श्री विजयपुरम (पोर्ट ब्लेयर)', 'Andaman and Nicobar', 11.6234, 92.7265],
];
// The original 100 cities. `major` (first 60) = shown in festival tables and the no-JS city picker.
// `top` = these 100 cities: per-city sunrise pages, and festival × city pages for regional festivals in their state
// (all-India festivals only get festival × city pages for the 60 `major` cities; see fcOk in pages.js). Every place,
// districts included, has a moonrise page listing all its festival times for the next 12 months, so visitors still
// see everything without ~19,000 near-identical festival × district pages.
const CITIES = RAW.map(([slug, en, hi, state, lat, lng], i) => ({ slug, name: { en, hi }, state, lat, lng, top: true, major: i < 60 }));

/* ---------- Every district of India (src/districts.js) ----------
   A district whose name matches a nearby existing city (within 15 km, e.g. "Mumbai City", "Bengaluru Urban",
   "Kanpur Nagar") becomes an alias that points to that city's page instead of a duplicate page. */
const { DISTRICTS } = require('./districts');
const STATE_FIX = { 'Andaman and Nicobar Islands': 'Andaman and Nicobar' };
const MANUAL_ALIAS = { 'Chhatrapati Sambhajinagar|Maharashtra': 'aurangabad' }; // renamed city, same place
const slugify = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const core = s => slugify(s).replace(/-(urban|city|nagar|metropolitan|suburban|district)$/g, '').replace(/-/g, '');
const km = (a, b) => {
  const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};
const ALIASES = []; // { name: {en, hi}, state, slug } – districts that point to an existing city page
const BASE = CITIES.slice(); // match only against the original 100 cities
const used = new Set(CITIES.map(c => c.slug));
for (const [en, hi, st, lat, lng] of DISTRICTS) {
  const state = STATE_FIX[st] || st, p = { lat, lng };
  const manual = MANUAL_ALIAS[en + '|' + state];
  const match = manual ? BASE.find(c => c.slug === manual)
    : BASE.find(c => km(p, c) < 15 && (core(en).includes(core(c.name.en)) || core(c.name.en).includes(core(en))));
  if (match) {
    // Same name as the city (e.g. Chennai district → Chennai): the city entry already covers it.
    if (slugify(en) !== slugify(match.name.en)) ALIASES.push({ name: { en, hi }, state, slug: match.slug });
    continue;
  }
  let slug = slugify(en), name = { en, hi };
  // Same name as another place (e.g. Aurangabad in Bihar and Maharashtra): add the state to the slug and the name.
  if (used.has(slug)) { slug = `${slug}-${slugify(state)}`; name = { en: `${en} (${state})`, hi: `${hi} (${state})` }; }
  used.add(slug);
  CITIES.push({ slug, name, state, lat, lng, top: false, major: false, district: true });
}
module.exports = { CITIES, ALIASES };
