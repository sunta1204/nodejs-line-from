$('#btnFacebookLogin').click(async (e) => {
    e.preventDefault()
    await $.ajax({
        type: 'POST',
        contentType: "application/json",
        dataType : 'json',
        url : '/allfacebooklogin',
        beforeSend: () => {
            Swal.fire({
                title: 'Loading....',
                didOpen: () => {
                    Swal.showLoading()
                },
            })
        },
        success: (response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                showConfirmButton: true,
                timer: 1500
            }).then((result) => {
                if(result.isConfirmed){location.href='/mangeaccount'}
            })
            location.href='/mangeaccount'
        },
        error: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error',
            })
        }
    })
    return false
})

function getCookie(uid){
    
    const data = {
        uid : [uid]
    }
    Swal.fire({
        title: 'Loading....',
        didOpen: () => {
            Swal.showLoading()
        },
    })
    axios.post('/facebooklogin', data, {})
    .then((res) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: true,
            timer: 1500
        }).then((result) => {
            if(result.isConfirmed){location.href='/mangeaccount'}
        })
        location.href='/mangeaccount'
    })
    .catch((err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data,
        })
    })
}

function editFacebookAccount(uid) {
    const data = {
        uid : uid
    }
    axios.post('/findfacebookaccount', data, {})
    .then((result) => {
        const data = result.data.data
        $('#currentUid').val(null)
        $('#editUid').val(null)
        $('#editPassword').val(null)
        data.forEach(element => {
            $('#currentUid').val(element.uid)
            $('#editUid').val(element.uid)
            $('#editPassword').val(element.password)
        });
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something Went Wrong.',
        })
    })
    $("#modalEditFacebookAccount").modal('show')
}

$('#formInsertFacebookAccount').submit((event) => {

    event.preventDefault

    var uid = $('#uid').val()
    var password = $('#password').val()

    var data = {
        uid: uid,
        password: password,
    }

    axios.post('/insertfacebookaccount', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: true,
            timer: 1500
        }).then((result) => {
            if(result.isConfirmed){location.href='/mangeaccount'}
        })
        location.href='/mangeaccount'
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data,
        })
    })

    return false

})

$('#formEditFacebookAccount').submit((event) => {
    event.preventDefault
    var currentUid = $('#currentUid').val()
    var uid = $('#editUid').val()
    var password = $('#editPassword').val()
    var data = {
        currentUid : currentUid,
        uid: uid,
        password: password,
    }
    axios.post('/updatefacebookaccount', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        // console.log(response)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: true,
            timer: 1500
        }).then((result) => {
            if(result.isConfirmed){location.href='/mangeaccount'}
        })
        location.href='/mangeaccount'
    })
    .catch((error) => {
        // console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data,
        })
    })
    return false
})

$('#resetBtn').click(() => {
    $('#uid').val('')
    $('#password').val('')
})

function deleteFacebookAccount(uid) {
    const data = {
        uid: uid,
    }
    Swal.fire({
        text: "ต้องการลบ Facebook Account นี้หรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.post('/deletefacebookaccount', data, {})
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: true,
                    timer: 1500
                }).then((result) => {
                    if(result.isConfirmed){location.href='/mangeaccount'}
                })
                location.href='/mangeaccount'
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
            
        }
    })
}

$('#btnImportFile').click(() => {
    $('#modalImportFile').modal('show')
})

$('#formImportFile').submit((e) => {
    e.preventDefault

    var formData = new FormData();
    var imagefile = document.querySelector('#importExcel');
    formData.append("importExcel", imagefile.files[0]);

    $.ajax({
        type: 'POST',
        url : '/importFacebookAccount',
        dataType: 'json',
        contentType: false,
        processData: false,
        data : formData,
        beforeSend: () => {
            Swal.fire({
                title: 'Loading....',
                didOpen: () => {
                    Swal.showLoading()
                },
            })
        },
        success: (response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                showConfirmButton: true,
                timer: 1500
            }).then((result) => {
                if(result.isConfirmed){location.href='/mangeaccount'}
            })
            location.href='/mangeaccount'
        },
        error: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data,
            })
        }
    })

    return false
})
