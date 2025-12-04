import { useState, useEffect } from 'react'
import './App.css'

// Detect iOS
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [currentPlaying, setCurrentPlaying] = useState(null)

  // Audio element dành riêng cho iPhone
  const audioRef = typeof Audio !== 'undefined' ? new Audio() : null

  const correctPassword = '05122007'

  const favoriteSongs = [
    {
      id: 1,
      title: 'Nhiều Hơn',
      youtubeId: 'zylC5TE9jrk',
      mp3: '/audio/Nhiều Hơn (ft. JustaTee)  L2K The Album.mp3',
      artist: 'Low G'
    },
    {
      id: 2,
      title: 'In Love',
      youtubeId: 'T7ksmtaVeOk',
      mp3: '/audio/Low G  In Love (ft. JustaTee)  L2K The Album.mp3',
      artist: 'Low G, JustaTee'
    },
    {
      id: 3,
      title: 'Love Game',
      youtubeId: 'bMmIAaMcWsU',
      mp3: '/audio/Low G x tlinh  LOVE GAME  OFFICIAL MUSIC VIDEO.mp3',
      artist: 'Low G, tlinh'
    },
    {
      id: 4,
      title: 'Không Yêu Em Thì Yêu Ai',
      youtubeId: 'o-2yt0ZZZ6o',
      mp3: '/audio/Không Yêu Em Thi Yêu Ai_  Vu. ft. Low G (tư Album Bao Tang Cua Nuôi Tiêc).mp3',
      artist: 'Vũ. ft. Low G'
    },
    {
      id: 5,
      title: 'Dancing In The Dark',
      youtubeId: 'OZmK0YuSmXU',
      mp3: '/audio/soobin.mp3',
      artist: 'SOOBIN'
    }
  ]

  // ===== SỬA QUAN TRỌNG: PLAY AUDIO TRỰC TIẾP TRONG CLICK (bắt buộc với iOS) =====
  const handleSongClick = (songId) => {
    const song = favoriteSongs.find(s => s.id === songId)
    if (!song) return

    if (isIOS) {
      // Nếu đang phát bài này → pause
      if (currentPlaying === songId) {
        audioRef.pause()
        setCurrentPlaying(null)
      } else {
        // PHẢI GỌI PLAY() NGAY TRONG CLICK → iPhone mới cho phép
        audioRef.src = song.mp3
        audioRef.play().catch(() => {})
        setCurrentPlaying(songId)
      }
    } else {
      // PC + Android → YouTube iframe autoplay
      if (currentPlaying === songId) {
        setCurrentPlaying(null)
      } else {
        setCurrentPlaying(songId)
      }
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mật khẩu chưa đúng rồi! Em thử lại nhé 💕')
      setPassword('')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => setShowContent(true), 300)
      setTimeout(() => setShowHearts(true), 800)
    }
  }, [isAuthenticated])

  const createHeart = () => {
    const heart = document.createElement('div')
    heart.className = 'floating-heart'
    heart.style.left = Math.random() * 100 + '%'
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's'
    heart.textContent = '💕'
    document.body.appendChild(heart)

    setTimeout(() => {
      heart.remove()
    }, 5000)
  }

  useEffect(() => {
    if (showHearts) {
      const interval = setInterval(createHeart, 800)
      return () => clearInterval(interval)
    }
  }, [showHearts])

  // ===== MÀN HÌNH ĐĂNG NHẬP =====
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-stars"></div>
        <div className="login-stars2"></div>
        <div className="login-stars3"></div>

        <div className="login-box">
          <div className="login-icon">🔐</div>
          <h2 className="login-title">Nhập Mật Khẩu</h2>
          <p className="login-subtitle">Để khám phá điều bất ngờ đặc biệt 💝</p>

          <form onSubmit={handlePasswordSubmit} className="login-form">
            <div className="password-input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Nhập mật khẩu 8 chữ số"
                className="password-input"
                maxLength={8}
                autoFocus
              />
              <div className="password-dots">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`password-dot ${i < password.length ? 'filled' : ''}`}></span>
                ))}
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              Mở Khóa 💖
            </button>
          </form>

          <div className="login-hint">
            <p>💡 Gợi ý: Mật khẩu là một ngày đặc biệt (8 chữ số)</p>
          </div>
        </div>
      </div>
    )
  }

  // ===== TRANG CHÚC MỪNG SINH NHẬT =====
  return (
    <div className="birthday-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className={`content ${showContent ? 'show' : ''}`}>

        <div className="cake-container">
          <div className="cake">
            <div className="candle"><div className="flame"></div></div>
            <div className="frosting1"></div>
            <div className="frosting2"></div>
            <div className="frosting3"></div>
            <div className="cake-bottom"></div>
          </div>
        </div>

        <h1 className="title">🎉 Chúc Mừng Sinh Nhật! 🎉</h1>

        <div className="message-box">
          <p className="greeting">Gửi đến em, ưu tiên 1 của anh</p>
          <p className="message">
            Hôm nay là một ngày thật là đặc biệt em nhỉ...
          </p>
          <p className="wish">
            Chúc em luôn thật xinh đẹp, hạnh phúc và tràn đầy năng lượng...
          </p>
          <p className="love">
            💖 Anh chúc em sẽ có một ngày sinh nhật thật vui vẻ! 💖
          </p>
        </div>

        {/* ===== Danh sách nhạc ===== */}
        <div className="music-section">
          <h2 className="music-title">🎵 Những Bài Hát Yêu Thích Của Em 🎵</h2>

          <div className="music-list">
            {favoriteSongs.map((song) => (
              <div key={song.id} className="music-item">
                
                {/* Card nhạc */}
                <div className={`music-card ${currentPlaying === song.id ? 'playing' : ''}`}
                     onClick={() => handleSongClick(song.id)}>
                  <div className="music-icon">{currentPlaying === song.id ? '🎵' : '🎶'}</div>
                  <div className="music-info">
                    <h3 className="music-song-title">{song.title}</h3>
                    <p className="music-artist">{song.artist}</p>
                  </div>
                  <div className="music-play-button">
                    {currentPlaying === song.id ? '⏸️' : '▶️'}
                  </div>
                </div>

                {/* Đĩa xoay + player */}
                {currentPlaying === song.id && (
                  <>
                    <div className="music-disc">
                      <div className="disc-outer">
                        <div className="disc-inner">
                          <span className="disc-label">♫</span>
                        </div>
                      </div>
                      <p className="disc-now-playing">Đang phát: <span>{song.title}</span></p>
                    </div>

                    {/* iOS dùng audioRef → không render thẻ audio */}
                    {isIOS ? null : (
                      <div className="youtube-audio-player hidden-player">
                        <iframe
                          width="1"
                          height="1"
                          src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&playsinline=1&controls=0&modestbranding=1`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          className="youtube-iframe"
                        ></iframe>
                      </div>
                    )}
                  </>
                )}

              </div>
            ))}
          </div>

          <p className="music-add-more-text">Em muốn thêm bài gì nữa nè? 💕</p>
        </div>

      </div>
    </div>
  )
}

export default App
