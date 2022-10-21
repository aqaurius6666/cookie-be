module.exports = {
    response200: (res, data) => {
        return res.status(200).json({
            success: true,
            status: 200,
            data: data,
        });
    },
    response400: (res, message) => {
        return res.status(200).json({
            success: false,
            status: 400,
            message: message,
        });
    },
    response401: (res, message) => {
        return res.status(200).json({
            success: false,
            status: 401,
            message: message,
        });
    },
    response500: (res, message) => {
        return res.status(200).json({
            success: false,
            status: 500,
            message: message,
        });
    },
}