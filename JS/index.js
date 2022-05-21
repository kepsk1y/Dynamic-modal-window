let fruits = [
    {id: 1, title: 'apple', price: '40', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7_Dxixbi0MExPP0YYU078IcFQYPM9F1vxQ&usqp=CAU'},
    {id: 2, title: 'pineapple', price: '80', img: 'https://www.luluhypermarket.com/medias/643364-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNTAwNjJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDk0L2gyZi9oMDAvOTM1MDEzNTgwODAzMC5qcGd8NjE5ODdjOTg0ZjQ2NmRjMTBjZDA5Y2M4MjVmODEzOGM3ZTZjMmExNGMyNDM1ZjNmMTcxNzUxMDlhM2IzMGVkNA'},
    {id: 3, title: 'melon', price: '160', img: 'https://media.istockphoto.com/photos/canary-melon-isolated-on-white-background-picture-id1162476390?k=20&m=1162476390&s=612x612&w=0&h=dCDFcvTi0ZWdetr7XJFKvlu3traLs1x95ZbBVEritXc='}
]

const toHTML = fruit => `
<div class="card__item">
    <div class="card__img">
        <img class="img" src="${fruit.img}" alt="">
    </div>
    <div class="card__title">
        ${fruit.title}
    </div>
    <div class="card__text">
        Not the freshest
    </div>
    <div class="card__footer">
        <a href="#" class="footer__btn footer__btn-margin" data-btn="price" data-id="${fruit.id}">See price</a>
        <a href="#" class="footer__btn" data-id="${fruit.id}" data-btn="remove">Delete</a>
    </div>
</div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Price is  ',
    closable: true,
    width: '600px',
    footerButtons: [
        {text: 'Exit', handler() {
            console.log('Ok btn clicked')
            priceModal.close()
        }}
    ]
}) 

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if(btnType === 'price') {
        const fruit = fruits.find(f => f.id === id)
        
        priceModal.setContent(`
            <p>Price for ${fruit.title} - ${fruit.price}btc</p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `You are deleting ${fruit.title}`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }

    
})