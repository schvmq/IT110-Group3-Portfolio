// ============================================
// THE QUOTE COLLECTIVE - Portfolio JavaScript
// ============================================

/* 👤 ICOREYKJAVIK: Study modal controls and event handling
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements (Getting HTML elements by their IDs) ---
    // 👤 ICOREYKJAVIK: Member Modal Elements
    const memberModal = document.getElementById('member-modal');
    const closeMemberModalBtn = document.getElementById('close-member-modal');
    const memberCards = document.querySelectorAll('.member-card');
    const modalMemberImage = document.getElementById('modal-member-image');
    const modalMemberName = document.getElementById('modal-member-name');
    const modalMemberRole = document.getElementById('modal-member-role');
    const modalMemberBio = document.getElementById('modal-member-bio');

    // ============================================
    // 👤 ICOREYKJAVIK: Member Modal Functions
    // ============================================
    
    // Opens modal and fills it with member data
    const openMemberModal = (memberData) => {
        modalMemberImage.src = memberData.image;
        modalMemberImage.alt = `${memberData.name} avatar`;
        modalMemberName.textContent = memberData.name;
        modalMemberRole.textContent = memberData.role;
        modalMemberBio.textContent = memberData.bio;
        
        memberModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    };

    // Closes the modal and restores scrolling
    const closeMemberModal = () => {
        memberModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // 👤 ICOREYKJAVIK: Add click event to each member card
    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get member data from HTML data attributes
            const memberData = {
                name: card.dataset.name,
                role: card.dataset.role,
                bio: card.dataset.bio,
                image: card.dataset.image
            };
            openMemberModal(memberData);
        });
    });

    // 👤 ICOREYKJAVIK: Close modal when X button is clicked
    closeMemberModalBtn.addEventListener('click', closeMemberModal);

    // 👤 ICOREYKJAVIK: Close modal when clicking outside (on overlay)
    memberModal.addEventListener('click', (e) => {
        if (e.target === memberModal || e.target.classList.contains('modal-overlay')) {
            closeMemberModal();
        }
    });

    // 👤 ICOREYKJAVIK: Close modal when Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !memberModal.classList.contains('hidden')) {
            closeMemberModal();
        }
    });
});
