import log from 'loglevel';

// Устанавливаем уровень логирования
log.setLevel('debug');

// Функция отправки логов на сервер
async function sendLogToServer(logMessage) {
    try {
        await fetch('/api/log', { // Убедитесь, что URL соответствует вашему Django-приложению
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: logMessage }),
        });
    } catch (error) {
        console.error('Ошибка отправки лога на сервер:', error);
    }
}


// Перехватываем и отправляем логи
log.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = log.methodFactory(methodName, logLevel, loggerName);
    return (...args) => {
        rawMethod(...args);
        sendLogToServer(args.join(' '));
    };
};

log.setLevel(log.getLevel()); // Применяем новую фабрику метода

export default log;
