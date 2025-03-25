const { verifyIdentity } = require('./services/edevletVerify');

const runTest = async () => {
  const testData = {
    identityNumber: '18685059978',
    name: 'Alperen',
    surname: 'Tokay',
    birthDate: '15.10.2003',
  };

  const result = await verifyIdentity(testData);
  console.log('✅ Doğrulama sonucu:', result ? 'BAŞARILI' : 'BAŞARISIZ');
};

runTest();
