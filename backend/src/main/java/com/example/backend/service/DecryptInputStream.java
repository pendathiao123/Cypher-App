package com.example.backend.service;

import org.bouncycastle.crypto.BufferedBlockCipher;
import org.bouncycastle.crypto.engines.AESEngine;
import org.bouncycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.crypto.params.ParametersWithIV;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

public class DecryptInputStream extends FilterInputStream {
    private BufferedBlockCipher cipher;
    private byte[] buffer;
    private int bufferSize;

    public DecryptInputStream(InputStream in, byte[] key, byte[] iv) {
        super(in);
        cipher = new PaddedBufferedBlockCipher(new AESEngine());
        cipher.init(false, new ParametersWithIV(new KeyParameter(key), iv));
        buffer = new byte[cipher.getOutputSize(1)];
        bufferSize = 0;
    }

    @Override
    public int read() throws IOException {
        if (bufferSize == 0 || bufferSize == -1) {
            fillBuffer();
            if (bufferSize == 0) {
                return -1; // End of stream
            }
        }
        byte b = buffer[buffer.length - bufferSize];
        bufferSize--;
        return b & 0xFF;
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        if (bufferSize == 0 || bufferSize == -1) {
            fillBuffer();
            if (bufferSize == 0) {
                return -1; // End of stream
            }
        }
        int bytesRead = Math.min(bufferSize, len);
        System.arraycopy(buffer, buffer.length - bufferSize, b, off, bytesRead);
        bufferSize -= bytesRead;
        return bytesRead;
    }

    private void fillBuffer() throws IOException {
        bufferSize = in.read(buffer, 0, buffer.length);
        if (bufferSize > 0) {
            bufferSize = cipher.processBytes(buffer, 0, bufferSize, buffer, 0);
        } else {
            try {
                // Finalize the decryption process
                bufferSize = cipher.doFinal(buffer, 0);
            } catch (Exception e) {
                throw new IOException("Error during decryption", e);
            }
        }
    }

    @Override
    public void close() throws IOException {
        super.close();
        // Finalize the decryption process
        try {
            bufferSize = cipher.doFinal(buffer, 0);
        } catch (Exception e) {
            throw new IOException("Error during decryption", e);
        }
    }
}
