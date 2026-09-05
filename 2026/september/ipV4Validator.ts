function isValidIPv4(ipv4: string): boolean {
    const splittedIp = ipv4.split('.').filter(Boolean);

    if (splittedIp.length !== 4) return false;

    for (const part of splittedIp) {
        if (part.startsWith('0') && part.length > 1) return false;

        const toNumber = parseInt(part);
        if (toNumber < 0 || toNumber > 255) return false;
    }

    return true;
}

console.log(isValidIPv4("192.168.1.1") )//should return true.
console.log(isValidIPv4("0.0.0.0"))// should return true.
console.log(isValidIPv4("255.01.50.111")) //should return false.
console.log(isValidIPv4("255.00.50.111")) //should return false.
console.log(isValidIPv4("256.101.50.115")) //should return false.
console.log(isValidIPv4("192.168.101.")) //should return false.
console.log(isValidIPv4("192168145213")) //should return false.