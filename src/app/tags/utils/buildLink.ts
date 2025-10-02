export const buildLink = (publicId = '', isChain = false) =>
    `${window.location.origin}/share/tag/${publicId}${isChain ? '?lines=1' : ''}`;
