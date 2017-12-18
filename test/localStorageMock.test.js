import LocalStorageMock from '../src/localStorageMock'

const localStorageMock = new LocalStorageMock();

test('sets and gets local storage', () => {
    localStorageMock.setItem('test', 'test_value');
    expect(localStorageMock.getItem('test')).toMatch('test_value');
});

test('clears local storage', () => {
    localStorageMock.setItem('test', 'test_value');
    localStorageMock.clear();
    expect(localStorageMock.getItem('test')).toBeNull();
});

test('removes item from local storage', () => {
    localStorageMock.setItem('test', 'test_value');
    localStorageMock.removeItem('test');
    expect(localStorageMock.getItem('test')).toBeNull();
});
