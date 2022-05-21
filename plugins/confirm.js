$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            onClose() {
                modal.destroy()
            },
            content: options.content,
            footerButtons: [
                {text: 'Cancel', handler() {
                    modal.close()
                    reject()
                }},
                {text: 'Delete', handler() {
                    modal.close()
                    resolve()
                }}
            ]
        })

        setTimeout( () => modal.open(), 100)
    })
}