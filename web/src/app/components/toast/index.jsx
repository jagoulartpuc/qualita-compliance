import Swal from "sweetalert2";

export function Toast(props) {
    const options = { ...props }
    const Toast = Swal.mixin({
        toast: true,
        position: options.position || 'top-end',
        showConfirmButton: options.showConfirmButton || false,
        timer: options.timer || 1500,
        timerProgressBar: options.timerProgressBar || true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        didClose: () => options.didClose()
    });

    Toast.fire({
        icon: options.icon,
        title: options.title
    });
}