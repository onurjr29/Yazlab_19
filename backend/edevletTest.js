const { verifyIdentity } = require('./services/edevletVerify');

const runTest = async () => {
  const testData = {
    identityNumber: '26839383800',
    name: 'Onur',
    surname: 'er',
    birthDate: '09.08.2003',
  };

  const result = await verifyIdentity(testData);
  console.log('✅ Doğrulama sonucu:', result ? 'BAŞARILI' : 'BAŞARISIZ');
};

runTest();
