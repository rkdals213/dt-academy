/* '////'로 시작하는 한 줄의 코드 주석을 해제하고, 실행 가능하도록 옳바른 코드로 완성해 주세요! */

// /* 더보기/접기 기능 */
const toggleBtn = document.querySelector('.actions .toggle')
toggleBtn.addEventListener('click', function () {
    const contentEls = document.querySelectorAll('.content.toggle');
    let isHide = true
    contentEls.forEach(function (content) {
        content.classList.toggle('hide')
        isHide = content.classList.contains('hide')
    })
    toggleBtn.textContent = isHide ? '더보기' : '접기'
})

// /* 프로필 정보 공유 기능 */
const shareBtn = document.querySelector('.actions .share')
shareBtn.addEventListener('click', function () {
    share()
})

/* 다크 모드 토글 기능 */
const modeBtn = document.querySelector('.actions .mode')
modeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')
    modeBtn.textContent = document.body.classList.contains('dark-mode') ? '라이트 모드' : '다크 모드'
})

/* 프로필 공유 함수 */
async function share() {
    /* 각 지원 기능 확인! */
    const isSupportedShare = !!navigator?.share
    const isSupportedClipboard = !!navigator?.clipboard
    const isSupportedClipboardCommand = document.queryCommandSupported?.('copy')

    /* 모바일 브라우저 내장 공유 기능! */
    async function startNativeShare() {
        await navigator.share({
            title: document.querySelector('.header h1').textContent,
            text: document.querySelector('.header p').textContent,
            url: location.href /* 현재 페이지 주소! */
        })
    }

    /* 주소 복사 기능! */
    async function copyToClipboard() {
        /* 레거시 우선! */
        if (isSupportedClipboardCommand) {
            const textarea = document.createElement('textarea')
            textarea.style.position = 'fixed'
            textarea.style.top = 0
            textarea.style.left = 0
            textarea.value = location.href

            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()

            document.execCommand('copy')
            document.body.removeChild(textarea)
            alert('링크를 복사했어요 ><')
            return
        }
        if (isSupportedClipboard) {
            await navigator.clipboard.writeText(location.href)
            alert('링크를 복사했어요 ><')
        }
    }

    if (isSupportedShare) {
        return await startNativeShare()
    }
    if (isSupportedClipboard || isSupportedClipboardCommand) {
        return await copyToClipboard()
    }
}